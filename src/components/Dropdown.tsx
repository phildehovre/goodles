import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.scss'
import { useSession } from '@supabase/auth-helpers-react';
import SupabaseSignOut from './SupabaseSignOut';

interface Props {
    options: string[];
    // defaultOption: string;
    onSelect: (option: string) => void;
    children: React.ReactNode
}

const DropdownMenu: React.FC<Props> = ({ options,
    onSelect, children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // const [defaultOption, setDefaultOption] = useState<String>('About');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option: string) => {
        setIsOpen(false);
        onSelect(option);
    };

    const session = useSession()
    return (
        <div className="dropdown" ref={dropdownRef} >
            <div className="dropdown-toggle"
                style={{ backgroundImage: `url(${session?.user?.user_metadata.avatar_url})` }}
                onClick={() => setIsOpen(!isOpen)}>
                {children}
            </div>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map((option) => {
                        if (option === 'sign out') {
                            return (
                                <React.Fragment key='sign out'>
                                    <SupabaseSignOut />
                                </React.Fragment>
                            )
                        }
                        return (
                            < li key={option} onClick={() => handleOptionClick(option)}>
                                {option}
                            </li>
                        )
                    })}
                </ul>
            )
            }
        </div >
    );
};

export default DropdownMenu;
