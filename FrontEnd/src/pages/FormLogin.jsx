import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        

        const validEmail = 'rodrigobf437@gmail.com';
        const validPassword = 'contraseña123';

        if (email === validEmail && password === validPassword) {
            navigate('/dashboard');
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    };

    const handleSignUpRedirect = () => {
        navigate('/sign-in'); 
    };

    return (
        <div className="container">
            <div className="login-page">
                <div className="login-left">
                    <div className="left-content">
                        <h1>¡Bienvenidos al DASHBOARD!</h1>
                        <p>¡Nos alegra verte aquí! Aquí podrás gestionar tu perfil, ver estadísticas en tiempo real y mucho más.</p>
                        <p>¿Qué puedes hacer en nuestro Dashboard?</p>
                        <ul>
                            <li>Monitorear datos en tiempo real.</li>
                            <li>Ver informes detallados y gráficos.</li>
                        </ul>
                    </div>
                </div>
                <div className="login-right">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2>Sign In</h2>
                        <div className="input-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter Your Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Set Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="show-password">
                                <input
                                    type="checkbox"
                                    onChange={() => setShowPassword(!showPassword)}
                                    aria-label="Show password"
                                />
                                <i className={`fas fa-eye${showPassword ? '' : '-slash'}`}></i>
                            </label>
                        </div>
                        <button type="submit" className="login-button">
                            Sign In <i className="fas fa-arrow-right"></i>
                        </button>
                        <div className="divider">
                            <span>O</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
