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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:8080/user/list')
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch user list");
        }
        return response.json();
      })
      .then(data => {
        // API 응답 데이터 구조 확인 및 변환
        const userArray = Array.isArray(data) ? data : data.content || data.users || [];
        console.log("Fetched users:", userArray);
        setUsers(userArray);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setError(error.message);
        setIsLoading(false);
      });
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
        console.log("Updated user:", updatedUser);
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setIsModalOpen(false);
        setSelectedUserIds([]);
      })
      .catch(error => {
        console.error("Error updating user:", error);
        alert("사용자 정보 업데이트 중 오류가 발생했습니다.");
      });
  };

  // 검색된 사용자 필터링
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.email?.toLowerCase().includes(search.toLowerCase())
  );

  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  if (isLoading) {
    return <PageContainer>데이터를 불러오는 중...</PageContainer>;
  }

  if (error) {
    return <PageContainer>오류 발생: {error}</PageContainer>;
  }

  return (
    <PageContainer>
      <ControlsContainer>
        <SearchBar 
          search={search} 
          onSearchChange={setSearch} 
          onSearch={() => setCurrentPage(1)} 
        />
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