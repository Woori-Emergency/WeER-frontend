import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '../../components/admin/SearchBar';
import UserTable from '../../components/admin/UserTable';

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
  const navigate = useNavigate();
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
    const token = localStorage.getItem('accessToken');
    const userRole = localStorage.getItem('role');
    const tokenExpiry = parseInt(localStorage.getItem('tokenExpiry'), 10);
    const currentTime = Date.now();

    // 권한 확인 및 토큰 만료 확인
    if (!token || userRole !== 'ADMIN') {
      alert("관리자 권한이 필요합니다.");
      navigate('/login');
      return;
    }

    if (tokenExpiry && currentTime > tokenExpiry) {
      alert('세션이 만료되었습니다. 다시 로그인해주세요.');
      localStorage.clear(); // 만료된 토큰 정보 삭제
      navigate('/login');
      return;
    }

    // 사용자 목록 가져오기
    setIsLoading(true);
    fetch(`${process.env.REACT_APP_API_BASE_URL}/user/list`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch user list");
        }
        return response.json();
      })
      .then(data => {
        const userArray = Array.isArray(data.result) ? data.result : [];
        setUsers(userArray);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, [navigate]);

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
    const token = localStorage.getItem('accessToken');
    fetch(`${process.env.REACT_APP_API_BASE_URL}/user/update/${editingUser.id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then(response => {
        if (!response.ok) throw new Error("Failed to update user");
        return response.json();
      })
      .then((updatedUser) => {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setIsModalOpen(false);
        setSelectedUserIds([]);
      })
      .catch(error => {
        console.error("Error updating user:", error);
        alert("사용자 정보 업데이트 중 오류가 발생했습니다.");
      });
  };

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