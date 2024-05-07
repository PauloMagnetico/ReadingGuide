import { render } from '@testing-library/react';
import NavBar from '../NavBar';

describe('NavBar Component', () => {
    it('renders NavBar component with correct elements', () => {
        const { getByText, getByRole } = render(<NavBar />);

        // Check if the text "Leeswijzer" is rendered
        expect(getByText('Leeswijzer')).toBeInTheDocument();

        // Check if the Info icon button is present
        const iconButton = getByRole('button', { name: 'menu' });
        expect(iconButton).toBeInTheDocument();
    });

    it('contains the correct link', () => {
        const { getByRole } = render(<NavBar />);

        // Check if the link points to '/infoPage'
        const link = getByRole('link', { name: 'to /infoPage' });
        expect(link).toHaveAttribute('href', '/infoPage');
    });

    it('has the correct background color class', () => {
        const { container } = render(<NavBar />);

        // Check if the background color class 'bg-palette_3' is applied to the Toolbar
        const toolbar = container.querySelector('.bg-palette_3');
        expect(toolbar).toBeInTheDocument();
    });
});