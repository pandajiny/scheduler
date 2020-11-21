import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  providers: [GroupService],
  controllers: [GroupController],
  imports: [DbModule],
  exports: [GroupService],
})
export class GroupModule {}
