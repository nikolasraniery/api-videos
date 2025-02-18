import { db } from './db.js';

export class DatabasePostgres {

 async list(search) {
    let videos;

    if (search) {
      videos = await db.any('SELECT * FROM videos WHERE title LIKE $1', [`%${search}%`]);
      return videos;
   }

   videos = await db.any('SELECT * FROM videos');
   return videos;
 }

 async create(video) {
    const { title, description, duration } = video;

    await db.none('INSERT INTO videos(title, description, duration) VALUES($1, $2, $3)', [title, description, duration]);

 }

 update(id, video) {

   const { title, description, duration} = video;

   db.none('UPDATE videos SET title = $1, description = $2, duration = $3 WHERE id = $4', [title, description, duration, id]);

 }

 delete(id) {

       db.none('DELETE FROM videos WHERE id = $1', [id]);
 }
}