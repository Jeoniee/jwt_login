import React, { useState } from 'react';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,POST'
                },
                body: JSON.stringify({ username: username, password: password }),
                mode: 'cors',
                credentials : 'include' //쿠키포함해서 요청 보내는 거
            });

            if (response.ok) {
                // 응답이 성공적으로 도착한 경우
                const data = await response.json();
                const token = data.accessToken; //서버에서 받아온 accessToken

                //토큰을 쿠키에 마참내 저장
                document.cookie = `token=${token}; Secure; SameSite=None`;

                console.log(token);
                console.log(data);
            } else {
                // 응답이 실패한 경우
                console.error('응답 실패:', response.statusText);
            }
        } catch (error) {
            console.error('네트워크 에러:', error);
            setErrorMessage('틀렸어');
        }


    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">사용자 이름:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default Login;
