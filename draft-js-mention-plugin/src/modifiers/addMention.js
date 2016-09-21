import { Modifier, EditorState, Entity } from '@massdrop/draft-js';
import getSearchText from '../utils/getSearchText';

const addMention = (editorState, mention, entityMutability) => {
  const entityKey = Entity.create('mention', entityMutability, { mention });

  const currentSelectionState = editorState.getSelection();
  const { begin, end } = getSearchText(editorState, currentSelectionState);

  // get selection of the @mention search text
  const mentionTextSelection = currentSelectionState.merge({
    anchorOffset: begin,
    focusOffset: end,
  });

  let mentionReplacedContent = Modifier.replaceText(
    editorState.getCurrentContent(),
    mentionTextSelection,
    mention.get('name'),
    null, // no inline style needed
    entityKey
  );

  // If the mention is inserted at the end, a space is appended right after for
  // a smooth writing experience.
  const blockKey = mentionTextSelection.getAnchorKey();
  const blockSize = editorState.getCurrentContent().getBlockForKey(blockKey).getLength();
  if (blockSize === end) {
    mentionReplacedContent = Modifier.insertText(
      mentionReplacedContent,
      mentionReplacedContent.getSelectionAfter(),
      ' ',
    );
  }

  const newEditorState = EditorState.push(
    editorState,
    mentionReplacedContent,
    'insert-mention',
  );
  return EditorState.forceSelection(newEditorState, mentionReplacedContent.getSelectionAfter());
};

export default addMention;
