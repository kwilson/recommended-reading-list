import { render, screen } from '@testing-library/react';

import { LoaderContainer } from './LoaderContainer';

describe(`<${LoaderContainer.name} />`, () => {
  const ChildItem = () => <p data-testid="child-item-content">Child Item</p>;

  it('renders as expected when loading', async () => {
    const { asFragment } = render(
      <LoaderContainer loading>
        <ChildItem />
      </LoaderContainer>
    );

    expect(screen.getByTestId('loader')).toBeDefined();
    expect(screen.queryByTestId('child-item-content')).toBe(null);

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders as expected when not loading', async () => {
    const { asFragment } = render(
      <LoaderContainer loading={false}>
        <ChildItem />
      </LoaderContainer>
    );

    expect(screen.getByTestId('child-item-content')).toBeDefined();
    expect(screen.queryByTestId('loader')).toBe(null);

    expect(asFragment()).toMatchSnapshot();
  });
});
