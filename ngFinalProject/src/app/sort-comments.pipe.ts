import { CalculateVotesPipe } from './calculate-votes.pipe';
import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from './models/comment';
@Pipe({
  name: 'sortComments'
})
export class SortCommentsPipe implements PipeTransform {
  constructor(private votePipe: CalculateVotesPipe) {}

  transform(comments: Comment[], args: string): any {
     if (args === 'NEWEST') {

      comments.sort(function(a, b) {
        return (
          new Date(b.dateUpdated).getTime() - new Date(a.dateUpdated).getTime()
        );
      });

    } else if (args === 'OLDEST') {

      comments.sort(function(a, b) {
        return (
          new Date(a.dateUpdated).getTime() - new Date(b.dateUpdated).getTime()
        );
      });

    } else if (args === 'TOP_REP') {

      comments.sort(function(a, b) {
        return (
          b.user.reputation - a.user.reputation
        );
      });

    } else if (args === 'TOP_RATED') {

      comments.sort(function(a, b) {

        const aVotes = a.votes;
        const bVotes = b.votes;


        let upCount = 0;
        let downCount = 0;
        aVotes.forEach(vote => {
          if (vote.vote) {
            upCount++;
          } else {
            downCount++;
          }
        });

        const aTotal = upCount - downCount;

         upCount = 0;
         downCount = 0;
        bVotes.forEach(vote => {
          if (vote.vote) {
            upCount++;
          } else {
            downCount++;
          }
        });

        const bTotal = upCount - downCount;
        return (
          bTotal - aTotal
        );
      });

    }
    return comments;
  }
}
