export interface ChapterMO {
  id: number;
  story_id: number;
  content: string;
  wallet_address: string;
  level: number;
  path: number[];
  is_anonymous: boolean;
  has_child: boolean;
  parent_id: number;
  credential: string;
  created_at: number;
}

export interface Chapter {
  id: number;
  content: string;
  story_id: number;
  parent_id: number;
  wallet_address: string;
  path: number[];
  child_count: number;
}

/**
 * @description transforms a `ChapterMO` object into a `Chapter` object, with necessary
 * properties for further manipulation or serialization.
 * 
 * @param { ChapterMO } chapter - ChapterMO object to be transformed into a new Chapter
 * object with updated properties.
 * 
 * @returns { Chapter } a Chapter object with the same properties as the input ChapterMO
 * object.
 */
export function toChapter(chapter: ChapterMO): Chapter {
  return {
    id: chapter.id,
    content: chapter.content,
    story_id: chapter.story_id,
    parent_id: chapter.parent_id,
    wallet_address: chapter.wallet_address,
    path: chapter.path,
  } as Chapter;
}
