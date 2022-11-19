import axios from 'axios';
import config from '../configuration.json';
import MatchEntry from '../models/match-entry';

export default class MatchesService {
  public static async getMatches(page: number) {
    const res = await axios.get<MatchEntry[]>(
        `${config.BACKEND_URL}/match?page=${page}`);
    return res.data;
  }
}
