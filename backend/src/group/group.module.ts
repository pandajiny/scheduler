import { forwardRef, Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { DbService } from 'src/db/db.service';
import { UsersModule } from 'src/users/users.module';
import { GroupService } from './group.service';

@Module({
  providers: [GroupService],
  exports: [GroupService],
  imports: [DbModule, forwardRef(() => UsersModule)],
})
export class GroupModule {}
