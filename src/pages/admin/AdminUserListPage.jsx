import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserTable from '../../components/admin/UserTable';
import SearchBar from '../../components/admin/SearchBar';

const PageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

function AdminUserListPage() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    fetch('http://localhost:8080/user/list')
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch user list");
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched users:", data); // 데이터 로깅
        setUsers(data);
      })
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const handleOpenEditModal = () => {
    if (selectedUserIds.length === 1) {
      const user = users.find((u) => u.id === selectedUserIds[0]);
      setEditingUser(user);
      setIsModalOpen(true);
    } else {
      alert("수정할 사용자를 한 명만 선택해주세요.");
    }
  };

  const handleSaveUser = (updatedData) => {
    fetch(`http://localhost:8080/user/update/${editingUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
      .then(response => {
        if (!response.ok) throw new Error("Failed to update user");
        return response.json();
      })
      .then((updatedUser) => {
        console.log("Updated user:", updatedUser); // 업데이트된 데이터 로깅
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setIsModalOpen(false);
        setSelectedUserIds([]); // 수정 후 선택 해제
      })
      .catch(error => console.error("Error updating user:", error));
  };

  const displayedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <PageContainer>
      <ControlsContainer>
        <SearchBar search={search} onSearchChange={setSearch} onSearch={() => setCurrentPage(1)} />
      </ControlsContainer>
      <UserTable 
        users={displayedUsers} 
        selectedUserIds={selectedUserIds} 
        setSelectedUserIds={setSelectedUserIds} 
      />      
    </PageContainer>
  );
}

export default AdminUserListPage;