import { LoadMoreButton } from './Button.styled';

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <LoadMoreButton type="button" onClick={onClick}>
      Load more
    </LoadMoreButton>
  );
};
