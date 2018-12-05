import { CalculateVotesPipe } from './calculate-votes.pipe';
import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from './models/comment';
@Pipe({
  name: 'sortComments'
})
export class SortCommentsPipe implements PipeTransform {
  constructor(private votePipe: CalculateVotesPipe) {}

  transform(comments: Comment[], args: string): any {
    if (args === 'TOP') {

      comments.sort(function(a, b) {
        return (
          this.votePipe.transform(a.votes) - this.votePipe.transform(b.votes)
        );
      });

    } else if (args === 'NEWEST') {

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

    }
    return comments;
  }
}
