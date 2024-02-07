import { Page, type Link } from 'utils/page';
import { pipe } from 'utils/func';
import { Array } from '../utils/array';

export const link = (link: Link, text: string) =>
    `[[${pipe(
        Array.toDistinct,
        Array.toDefined,
        Array.join('|'),
    )([Page.filePath(link), text])}]]`;
