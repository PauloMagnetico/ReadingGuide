import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Link from '../Link';

// mock the use navigation Hook
jest.mock('../../hooks/use-navigation', () => ({
    useNavigation: () => ({
      navigate: jest.fn(),
      currentPath: '/'
    })
  }));

  it('applies active class name when current path matches "to" prop', () => {
    const { useNavigation } = require('../../hooks/use-navigation');
    useNavigation.mockImplementation(() => ({
      navigate: jest.fn(),
      currentPath: '/home'
    }));
  
    render(<Link to="/home" activeClassName="active">Go Home</Link>);
    const link = screen.getByRole('link', { name: 'Go Home' });
    expect(link).toHaveClass('active');
  });

  it('calls navigate function on click', () => {
    const { useNavigation } = require('../../hooks/use-navigation');
    const navigate = jest.fn();
    useNavigation.mockImplementation(() => ({
      navigate,
      currentPath: '/'
    }));
  
    render(<Link to="/home">Go Home</Link>);
    const link = screen.getByRole('link', { name: 'Go Home' });
    userEvent.click(link);
    expect(navigate).toHaveBeenCalledWith('/home');
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('prevents default link behavior on click', () => {
    const { useNavigation } = require('../../hooks/use-navigation');
    useNavigation.mockImplementation(() => ({
      navigate: jest.fn(),
      currentPath: '/'
    }));
  
    render(<Link to="/home">Go Home</Link>);
    const link = screen.getByRole('link', { name: 'Go Home' });
    const clickEvent = createEvent.click(link, { button: 0 });
    fireEvent(link, clickEvent);
    expect(clickEvent.defaultPrevented).toBe(true);
  });

//   it('allows default behavior when control key is pressed', async () => {
//     render(<Link to="/home">Go Home</Link>);
//     const link = screen.getByRole('link', { name: 'Go Home' });
  
//     // Simulate a click with the CTRL key held down
//     await userEvent.click(link, { ctrlKey: true });
  
//     const navigate = require('../../hooks/use-navigation').useNavigation().navigate;
//     expect(navigate).not.toHaveBeenCalled();
//   });
  
  
  
  