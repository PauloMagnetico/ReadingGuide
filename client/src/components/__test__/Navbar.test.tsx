import { render, fireEvent } from '@testing-library/react';
import NavBar from '../NavBar';

const defaultProps = {
    feedbackMode: false,
    handleSwitch: jest.fn(),
};

describe('NavBar Component', () => {
    it('renders NavBar component with correct elements', () => {
        const { getByText } = render(<NavBar {...defaultProps} />);

        expect(getByText('Leeswijzer')).toBeInTheDocument();
    });

    it('has the correct background color class', () => {
        const { container } = render(<NavBar {...defaultProps} />);

        const toolbar = container.querySelector('.bg-palette_3');
        expect(toolbar).toBeInTheDocument();
    });

    it('expands and collapses the info panel on icon click', () => {
        const { container } = render(<NavBar {...defaultProps} />);

        const infoPanel = container.querySelector('.max-h-0');
        expect(infoPanel).toBeInTheDocument();

        const iconButton = container.querySelector('.cursor-pointer');
        fireEvent.click(iconButton!);

        const expandedPanel = container.querySelector('.max-h-screen');
        expect(expandedPanel).toBeInTheDocument();
    });
});
