import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';

@Module({
  providers: [GroupService],
  exports: [GroupService],
  imports: [DbModule],
  controllers: [GroupController],
})
export class GroupModule {}
