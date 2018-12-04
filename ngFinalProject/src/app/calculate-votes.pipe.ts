import { Pipe, PipeTransform } from '@angular/core';
import { Vote } from './models/vote';

@Pipe({
  name: 'calculateVotes'
})
export class CalculateVotesPipe implements PipeTransform {
  transform(votes: Vote[]): any {

    if (!votes) {
      return 0;
    }
    let upCount = 0;
    let downCount = 0;
    votes.forEach(vote => {
      if (vote.vote) {
        upCount++;
      } else {
        downCount++;
      }
    });
    return upCount - downCount;
  }
}
