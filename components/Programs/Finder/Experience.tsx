import FolderContent from '../../UI/folder-view/folder-content';
import { TFolderContent } from '@/types/folder-view';
import { Container, LeftSide } from './UI';
import LineComment from '@/components/UI/line-comment';

export default function Experience(props: TFolderContent) {
  return (
    <FolderContent {...props} isGrid={false}>
      <Container>
        <LeftSide>
          <LineComment className="mt-0">This is experience section</LineComment>
        </LeftSide>
      </Container>
    </FolderContent>
  );
}
