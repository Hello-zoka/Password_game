import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import dogImage from './img/dog.jpg';
import sponsorImage from './img/sponsor.svg';
import refreshImage from './img/refresh.svg';
import * as Captcha from './Captcha'
import './Map'
import GoogleStreetView, {flag_colours} from './Map';
import {morseAns, morseCode} from "./Morse";
import {countOccurrences, spawnWolfs} from "./Utils";


const PasswordGame = () => {
    let [password, setPassword] = useState('');
    let [beerDrinked, setBeer] = useState(false);
    let [wolfsSpawned, setWolfs] = useState(false);
    let [wolfsDead, setWolfsDead] = useState(false);


    let [show_cnt, setShowCnt] = useState(1);

    useEffect(() => { // Beer drinking
        const intervalId = setInterval(() => {
            if (beerDrinked) {
                let nw_password = password;
                let pos = password.indexOf('🍺');
                let bunny_pos = password.indexOf('🐰');
                if (bunny_pos < 0) {
                    nw_password = "Bunny is dead xD";
                    setBeer(false);
                    beerDrinked = false;
                    setShowCnt(1);
                    show_cnt = 1;
                }
                if (pos < 0) { // No beer(
                    nw_password = "NOO BEEER -- NO PASSWORD";
                    setBeer(false);
                    beerDrinked = false;
                    setShowCnt(1);
                    show_cnt = 1;
                } else if (countOccurrences(password, '🍺') > 3) { // Too much beer
                    nw_password = "I'm Ok, I'm alcoholic";
                    setBeer(false);
                    beerDrinked = false;
                    setShowCnt(1);
                    show_cnt = 1;
                } else {
                    nw_password = password.length > 0 ? password.slice(0, pos) + password.slice(pos + '🍺'.length) : password
                }
                setPassword(nw_password);
                password = nw_password;
                checkPassword();
            }

        }, 15000); // 15 seconds interval

        return () => clearInterval(intervalId);
    }, [beerDrinked, show_cnt]);

    useEffect(() => { // Wolf hunting bunny
        const intervalId = setInterval(() => {
            if (wolfsSpawned) {
                let new_pass = spawnWolfs(password);
                setPassword(new_pass);
                password = new_pass;
                checkPassword();
            }
        }, 2000); // 2 seconds interval

        return () => clearInterval(intervalId);
    }, [wolfsSpawned]);

    const [requirements, setRequirements] = useState([
        'Password must be at least 5 characters long',
        'Password must contain at least one uppercase letter',
        'Password must contain at least one lowercase letter',
        'Password must contain at least one number',
        'Password must contain at least one special character',
        'All digits in password have to sum in 30',
        <div className="image-requirement">
            <p>Password must contain our sponsor</p>
            <img src={sponsorImage}/>
        </div>,
        "Put Mr.Bunny in your password 🐰 and enjoy his cuteness",
        "Mr.Bunny has to drink one 🍺 each 15 seconds. Don't make him sad!",
        <div>
            <p>Password must contain this Morse code</p>
            <p className="morse-code">{morseCode}</p>
            {/*<p>{morseAns}</p>*/}
        </div>,


        <div className="image-requirement">
            <p>What does the dog say?</p>
            <img src={dogImage}/>
        </div>,

        GoogleStreetView(),
        <div key="captchaRequirement" className="captcha-requirement">
            <p>Password must contain answer to this captcha(6 chars)</p>
            <img src={`data:image/png;base64,${Captcha.img}`} alt="Captcha"/>
            <button onClick={updCaptchaImage} className="reload-button"><img src={refreshImage} alt="refresh_img"/>
            </button>
        </div>,

        <div>
            <p>Press it!</p>
            <button onClick={startWolfs} className="start-wolfs"> Just a button
            </button>
        </div>,
        "Great password!! Use it in the future"

    ]);
    const [status, setStatus] = useState(Array.from({length: requirements.length}, () => false));

    function startWolfs() {
        wolfsSpawned = true;
        setWolfs(true);
    }

    const updateRequerments = (index, newValue) => {
        const newArray = [...requirements];
        newArray[index] = newValue;
        setRequirements(newArray);
    };

    function updCaptchaImage() {
        Captcha.updCaptchaImg();
        updateRequerments(12, <div key="captchaRequirement" className="captcha-requirement">
            <p>Password must contain answer to this captcha(6 chars)</p>
            <img src={`data:image/png;base64,${Captcha.img}`} alt="Captcha"/>
            <button onClick={updCaptchaImage} className="reload-button"><img src={refreshImage} alt="refresh_img"/>
            </button>
        </div>)
    }


    const checkPassword = () => {
        let bunny_id = password.indexOf('🐰');
        if (beerDrinked && bunny_id < 0) { // Bunny has to be safe
            password = "Bunny is dead xD";
            setPassword(password);
            setBeer(false);
            beerDrinked = false;
            setShowCnt(1);
            show_cnt = 1;
        }
        if (wolfsSpawned && !password.includes("🐺")) {
            setWolfsDead(true);
            wolfsSpawned = false;
            setWolfs(false);
        }

        const curStatus = [
            password.length >= 5,
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /\d/.test(password),
            /[!@#$%^&*(),.?":{}|<>]/.test(password),
            (password.match(/\d/g) ?? ["0"]).reduce((acc, digit) => acc + parseInt(digit, 10), 0) === 30,
            /[Jj]et[Bb]rains/.test(password),
            password.includes('🐰'),
            password.includes('🍺') || beerDrinked,
            password.includes(morseAns),
            /[wW]oof/.test(password),
            flag_colours.some((str) => password.includes(str)),
            password.includes(Captcha.text),
            wolfsDead,
            true
        ]

        for (let i = 0; i < curStatus.length; i++) {
            const new_show = Math.max(show_cnt, i + 1);
            setShowCnt(new_show);
            if (!curStatus[i]) {
                break;
            }
        }
        if (show_cnt >= 8) {
            setBeer(true);
        }
        setStatus(curStatus);
    };

    const handleInputChange = (e) => {
        setPassword(e.target.value);
        password = e.target.value;
        checkPassword();
    };

    return (
        <div className="password-game-container">
            <h1>Password Game</h1>
            <div className="label-container">
                <label>Enter Password:</label>
            </div>

            <label>

                <input value={password} onChange={handleInputChange}/>
            </label>

            <div>
                <h3>Requirements:</h3>
                <div className="requirements-container">
                    {/* Unsatisfied requirements first */}
                    {requirements.slice(0, show_cnt).filter((requirements, index) => (status[index] === false)).reverse().map((requirement, index) => (
                        <div
                            className={`requirement-block bad`}
                        >
                            {requirement}
                        </div>
                    ))}
                    {/* Satisfied requirements */}
                    {requirements.slice(0, show_cnt).filter((requirements, index) => (status[index] === true)).reverse().map((requirement, index) => (
                        <div
                            // key={id}
                            className={`requirement-block ok`}
                        >
                            {requirement}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PasswordGame;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <PasswordGame/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
