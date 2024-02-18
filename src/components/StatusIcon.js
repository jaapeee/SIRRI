  import React , { useState }from 'react';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

  const StatusIcon = ({ icon, color, className, size, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);


    const iconStyle = { color: color || 'red',
                        fontSize: size || '2em', 
                        cursor: 'pointer', 
                        transition: '0.5s',
                        position: 'absolute',


                        ...(isHovered && {
                          fontSize: size || '2.2em'
                          // Add more hover styles as needed
                        }),
                      }; // Set default color to red if not provided

    return icon ? <FontAwesomeIcon icon={icon} style={iconStyle} className={className} 
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={onClick} 
                  /> : null;
  };

  export default StatusIcon;