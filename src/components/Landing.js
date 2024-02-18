import React, { useEffect, useRef, useState }from 'react'
import styles from'./Landing.module.css'
import logo from '../assets/Agriculture Farm Barn Logo (1).png'
import bag from '../assets/bag-seedling (1).png'
import dash from '../assets/dashboard (1).png'
import book from '../assets/book-user (1).png'
import settings from '../assets/settings (1).png'
import ph2 from '../assets/2.png'
import ph1 from '../assets/1.png'
import ph3 from '../assets/3.png'
import ph4 from '../assets/4.png'
import ic1 from '../assets/blob-haikei (2).png'
import ic2 from '../assets/blob-haikei.png'
import ic3 from '../assets/blob-haikei (4).png'
import ic4 from '../assets/blob-haikei (1).png'
import ic5 from '../assets/blob-haikei (3).png'
import sili from '../assets/sili.png'
import p1 from '../assets/3-removebg-preview.png'
import p2 from '../assets/4-removebg-preview.png'
import p3 from '../assets/5-removebg-preview.png'
import b1 from '../assets/temperature-low.png'
import b2 from '../assets/grate-droplet.png'
import b3 from '../assets/humidity.png'
import b4 from '../assets/tank-water (1).png'
import b5 from '../assets/smart-farming-iot.png'
import b6 from '../assets/UAE_-Agricultural-Company-Uses-High-Tech-to-Achieve-Food-Security-2.jpeg'
import b7 from '../assets/5.png'
import arduino from '../assets/arduino.jpg'
import { database } from '../firebase'
import { onValue, ref } from 'firebase/database'
import { faE, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import StatusIcon from './StatusIcon';



function Landing() {
    const stn1 = useRef(null);
    const stn2 = useRef(null);
    const stn3 = useRef(null);
    const stn4 = useRef(null);
    const stn5 = useRef(null);
    const [activeButton, setActiveButton] = useState('stn1');
    const [activeSection, setActiveSection] = useState('stn1');
    const [air, setAir] = useState([]);
    const [precipitation, setPrecipitation] = useState([]);
    const [soil, setSoil] = useState([]);
    const [water, setWater] = useState([]);
    const [modal, setModal] = useState(false);


    const toggleModal = () =>{
        setModal(!modal);
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
    
            if (stn1.current?.offsetTop && scrollPosition >= stn1.current.offsetTop && scrollPosition < stn2.current.offsetTop) {
                setActiveSection('stn1');
            } else if (stn2.current?.offsetTop && scrollPosition >= stn2.current.offsetTop && scrollPosition < stn3.current.offsetTop) {
                setActiveSection('stn2');
            } else if (stn3.current?.offsetTop && scrollPosition >= stn3.current.offsetTop && scrollPosition < stn4.current.offsetTop) {
                setActiveSection('stn3');
            } else if (stn4.current?.offsetTop && scrollPosition >= stn4.current.offsetTop && scrollPosition < stn5.current.offsetTop) {
                setActiveSection('stn4');
            }
            else if (stn5.current?.offsetTop && scrollPosition >= stn5.current.offsetTop) {
            setActiveSection('stn5');
        }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [stn1, stn2, stn3, stn4, stn5]);

    const scrollToSection = (elementRef, button) => {
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: 'smooth',
        });

        setActiveButton(button);
        setActiveSection(button);
    };

    useEffect (() =>{
        const airRef = ref(database, 'Temperature/');
        const precipitationRef = ref(database, 'Humidity/');
        const soilRef = ref(database, 'Soil_Moisture/');
        const waterRef = ref(database, 'Water_Level/');

        const airListener = onValue(airRef, (snapshot) => {
            setAir(snapshot.val());
        })

        const precipitationListener = onValue(precipitationRef, (snapshot) => {
            setPrecipitation(snapshot.val());
        })

        const soilListener = onValue(soilRef, (snapshot) => {
            setSoil(snapshot.val());
        })

        const waterListener = onValue(waterRef, (snapshot) =>{
            setWater(snapshot.val());
        });

        return () =>{
            airListener();
            precipitationListener();
            soilListener();
            waterListener();
        };

    }, []);


    const getAir = (value) => {
        if (value >= 0 && value <= 19) {
          return { status: 'Cold', icon: faExclamationTriangle };
        } else if (value >= 20 && value <= 35) {
          return { status: 'Normal', icon: null };
        } else if (value >= 36 && value <= 100) {
          return { status: 'Too hot', icon: faExclamationTriangle };
        } else {
          return { status: 'Unkown', icon: null };
        }
      };

    const getSoil = (value) => {
        if (value >= 0 && value <= 30) {
          return { status: 'Dry', icon: faExclamationTriangle };
        } else if (value >= 31 && value <= 60) {
          return { status: 'Moist', icon: null };
        } else if (value >= 61 && value <= 100) {
          return { status: 'Wet', icon: faExclamationTriangle };
        } else {
          return { status: 'Unknown', icon: null };
        } 
      };

      const getHumidity = (value) => {
        if (value >= 0 && value <= 39) {
            return { status: 'Low', icon: faExclamationTriangle };
        } else if (value >= 40 && value <= 70) {
            return { status: 'Normal', icon: null };
        } else if (value >=71) {
            return { status: 'High', icon: faExclamationTriangle };
        } else {
            return { status: 'Unknown', icon: null };
        }
      };

      const getWater = (value) => {
        if (value >= 0 && value <= 200) {
            return { status: 'Empty Tank', icon: faExclamationTriangle };
        } else if (value >= 201 && value <= 350) {
            return { status: 'Medium', icon: faExclamationTriangle };
        } else if (value >= 351 && value <= 400) {
            return { status: 'Full Tank', icon: null };
        } else {
            return { status: 'Unknown', icon: null };
        }
      };
    

  return (
    <div>
        <header>
            <nav className={styles.sidebar}>
                <img src={logo}  className={`${styles.logo} ${activeButton === 'stn1' ? styles.active : ''}`} alt='logo' onClick={() => scrollToSection(stn1, 'stn1')}/>
                <div className={styles.navctn}>
                    <ul>
                        <li> <img src={bag} alt='bag' className={`${styles.icon} ${activeButton === 'stn2' ? styles.active : ''}`} onClick={() => scrollToSection(stn2, 'stn2')}/></li>
                        <li> <img src={dash} alt='dash' className={`${styles.icon2} ${activeButton === 'stn3' ? styles.active : ''}`} onClick={() => scrollToSection(stn3, 'stn3')}/></li>
                        <li> <img src={book} alt='book' className={`${styles.icon3} ${activeButton === 'stn4' ? styles.active : ''}`} onClick={() => scrollToSection(stn4, 'stn4')}/></li>
                    </ul>
                    <ul>
                        <li> <img src={settings} alt='settings'  className={`${styles.icon4} ${activeButton === 'stn5' ? styles.active : ''}`} onClick={() => scrollToSection(stn5, 'stn5')}/></li>
                    </ul>
                </div>
            </nav>
        </header>
        <div className={styles.ctn}>
            {/*  section 1 */ }
            <div className={styles.stn1} ref={stn1}>
                <div className={styles.ctn1}>
                    <h1 className={styles.title}> SIRRI allows homeowners to live in harmony with nature, constantly monitoring changes and adapting to them.
                    </h1>
                    <p className={styles.paragraph}>
                    The SIRRI: Integrated Monitoring System for Auto-irrigation with 
                    implementation of Soil Moisture sensor and Alert system is a system 
                    developed to provide adequate water supply in irrigation systems for 
                    agricultural fields by gathering data from the moisture sensor placed on the soil. 
                    SIRRI consists of a submersible water pump and water reservoir for the water supply.  
                    </p>
                </div>
                
                <div className={styles.ctn2}>
                    <img src={ph2} alt='ph2' className= {styles.ph2}/>
                    <img src={ph1} alt='ph1' className= {styles.ph1}/>
                    <img src={ph3} alt='ph3' className= {styles.ph3}/>
                    <img src={ph4} alt='ph4' className= {styles.ph4}/>
                </div>
                <div className={styles.ctn3}>
                    <img src={ic1} alt='ic1' className={styles.icon1}/>
                    <img src={ic2} alt='ic2' className={styles.icon1}/>
                    <img src={ic3} alt='ic3' className={styles.icon1}/>
                    <img src={ic4} alt='ic4' className={styles.icon1}/>
                </div>
            </div>

            {/* section 2 */}
            <div className={styles.stn2} ref={stn2}>
                <div className={styles.ctn4}>
                    <div className={styles.ctn5}>
                        <img src={ic5} alt='ic5' className={styles.ic5}/>
                        <img src={sili} alt='tomato' className={styles.tomato}/>
                            <div className={styles.pnt}>
                                <img src={p1} alt='p1' className={styles.p1}/>
                                <img src={p2} alt='p2' className={styles.p1}/>
                                <img src={p3} alt='p3' className={styles.p1}/>
                            </div>
                            <div className={styles.pnt1}>
                                <p className={styles.ttl1}> Water </p>
                                <p className={styles.ttl2}> Calories </p>
                                <p className={styles.ttl3}> Protein </p>
                            </div>
                    </div>
                    <div className={styles.ctn6}>
                        <h1 className={styles.title1}> Sili </h1>
                        <p className={styles.paragraph1}> 
                        Purple chili peppers (Capsicum frutescens), despite having a distinct color,
                        are actually of the same species as red peppers, locally known as “siling labuyo.” <br></br> <br></br>

                        The plants of siling labuyo can grow to a height of 0.8 to 1.5 meters. 
                        It is characterized by triangular fruits that grow upward and can measure up to 1.5 to 2.5 centimeters long.  <br></br> <br></br>

                        Commonly, the fruits of this plant start off as green then gradually changes to red when they’re ready to be harvested.
                        Unknown to many, there are actually a variety of colors during its maturation journey which include yellow, orange, and purple. 
                        </p>
                    </div>
                </div>
            </div>

            {/* section 3 */}
            <div className={styles.stn3} ref={stn3}>
               <div className={styles.ctn7}>
                    <h1 className={styles.title2}> Your Agricultural Assistant</h1>
                    <div className={styles.ctn8}> 
                        <div className={styles.box1}>
                            <div className={styles.bx1}>
                                <img src={b1} alt='air-temp' className={styles.ic6}/>
                                    <p className={styles.val}>{air} <span className={styles.unit}> C</span> </p>
                                    <p className={styles.subt}>Temperature </p> 
                            </div>
                            <StatusIcon icon={getAir(air).icon} className={styles.exclamationIcon} />
                            <div className={styles.bx2}>
                                <p className={styles.scale}> {getAir(air).status} </p>
                            </div>
                        </div>
                        <div className={styles.box2}>
                        <div className={styles.bx1}>
                            <img src={b2} alt='soil-moisture' className={styles.ic6}/>
                            <p className={styles.val1}>{soil}<span className={styles.unit}> % </span> </p>
                            <p className={styles.subt}>Soil Moisture</p>
                        </div>
                        <StatusIcon icon={getSoil(soil).icon} className={styles.exclamationIcon} onClick={toggleModal}  />
                        <div className={styles.bx2}>
                            <p className={styles.scale}> {getSoil(soil).status} </p>
                        </div>
                        </div>
                        <div className={styles.box3}>
                            <div className={styles.bx1}>
                                <img src={b3} alt='precipitation' className={styles.ic6}/>
                                    <p className={styles.val}>{precipitation} <span className={styles.unit}> % </span> </p>
                                    <p className={styles.subt}>Humidity</p>
                            </div>
                            <StatusIcon icon={getHumidity(precipitation).icon} className={styles.exclamationIcon} onClick={toggleModal} />
                            <div className={styles.bx2}>
                                <p className={styles.scale}>  {getHumidity(precipitation).status} </p>
                            </div>
                        </div>
                        <div className={styles.box4}>
                            <div className={styles.bx1}>
                                <img src={b4} alt='water-level' className={styles.ic6}/>
                                    <p className={styles.val}>{water} <span className={styles.unit}>  </span> </p>
                                    <p className={styles.subt}>Water Level</p>
                            </div>
                            <StatusIcon icon={getWater(water).icon} className={styles.exclamationIcon} onClick={toggleModal} />
                            <div className={styles.bx2}>
                                <p className={styles.scale}>  {getWater(water).status}  </p>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>

            {/* section 4 */}
            <div className={styles.stn4} ref={stn4}>
                <div className={styles.ctn9}>
                    <h1 className={styles.title3}> Sustainable Farming meets Technology </h1>
                        <div className={styles.ctn10}>
                            <div className={styles.box5}>
                                <img src={b5} alt='b5' className={styles.b5}/>
                                <img src={b6} alt='b6' className={styles.b5}/>
                                <img src={b7} alt='b7' className={styles.b5}/>
                            </div>
                            <div className={styles.box6}>
                                <div className={styles.bx3}>
                                    <p className={styles.subt2}> Innovations for a Greener Future</p>
                                </div>
                                <div className={styles.bx3}>
                                    <p className={styles.subt2}> The Power of Agricultural Monitoring</p>
                                </div>
                                <div className={styles.bx3}>
                                    <p className={styles.subt2}> Designing sustainable and Resilient Farms</p>
                                </div>
                            </div>
                            {/* <div className={styles.box5}></div> */}
                        </div>
                </div>
            </div>

            {/* section 5 */}
            <div className={styles.stn5} ref={stn5}>
                <div className={styles.ctn1}>
                    <h1 className={styles.title4}> Things used in this project </h1>
                        <div className={styles.ctn12}>
                           <div className={styles.box7}>
                                <div className={styles.b8}>
                                    <div className={styles.o1}> 
                                        <h1 className={styles.text}> Arduino Uno </h1>
                                    </div>
                                </div>
                                <div className={styles.b9}>
                                    <div className={styles.o1}> 
                                        <h1 className={styles.text}> DHT11 </h1>
                                    </div>
                                </div>
                                <div className={styles.b10}>
                                    <div className={styles.o1}> 
                                        <h1 className={styles.text}> Submersible Pump </h1>
                                    </div>
                                </div>
                            </div> 
                            <div className={styles.box8}>
                                <div className={styles.b11}>
                                        <div className={styles.o1}> 
                                            <h1 className={styles.text}> Soil Moisture </h1>
                                        </div>
                                    </div>
                                    <div className={styles.b12}>
                                        <div className={styles.o1}> 
                                            <h1 className={styles.text}> Water Level </h1>
                                        </div>
                                    </div>
                                    <div className={styles.b13}>
                                        <div className={styles.o1}> 
                                            <h1 className={styles.text}> Fan </h1>
                                        </div>
                                    </div>
                                </div> 
                            </div> 
                        </div>
                </div>


        </div>


    </div>
  )
}

export default Landing
