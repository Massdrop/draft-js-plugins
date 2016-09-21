import { Entity } from '@massdrop/draft-js';

function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && Entity.get(entityKey).getType() === 'link';
    }, callback
  );
}

export default findLinkEntities;
