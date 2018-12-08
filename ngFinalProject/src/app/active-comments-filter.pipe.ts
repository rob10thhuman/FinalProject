import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from './models/comment';

@Pipe({
  name: 'activeCommentsFilter'
})
export class ActiveCommentsFilterPipe implements PipeTransform {

  transform(comments: any[], args?: any): any {
    const results: Comment[] = [];

    comments.forEach((c) => {
      if (c.active || c.active === null) {
        results.push(c);
      }
    });
    return results;
  }

}
