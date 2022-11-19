import axios from 'axios';
import config from '../configuration.json';
import BookEntry from '../models/book-entry';

export default class BookkeepingService {
  public static async getHistory(page: number) {
    const res = await axios.get<BookEntry[]>(
        `${config.BACKEND_URL}/bookkeeping?page=${page}`);
    return res.data;
  }
}
