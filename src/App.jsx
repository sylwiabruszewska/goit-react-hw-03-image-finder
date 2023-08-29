import { Button, ImageGallery, Searchbar } from './components/index';

export const App = () => {
  return (
    <div>
      <Searchbar />
      <ImageGallery />
      <Button>Load more</Button>
    </div>
  );
};
