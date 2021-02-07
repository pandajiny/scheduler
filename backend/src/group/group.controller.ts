import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GroupService } from './group.service';

@UseGuards(AuthGuard)
@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}
  @Get('/')
  async getGroups(@Session() session, @Query() query): Promise<Group[]> {
    let uid: string;
    if (query.uid) {
      uid = query.uid as string;
      if (uid != session.uid) {
        throw new UnauthorizedException(`Access denied`);
      }
    } else {
      uid = session.uid as string;
    }

    console.log(`get groups request : ${uid}`);
    return await this.groupService.getGroupsFromUid(uid);
  }
  @Get('/:groupId')
  async getGroup(@Session() session, @Param() params): Promise<Group> {
    const uid = session.uid as string;
    const groupId = params.groupId as string;
    return await this.groupService.getGroupInformation(groupId, uid);
  }

  @Get('/:groupdId/todos')
  async getTodosFromGroupId(): Promise<Todo[]> {
    return [];
  }

  @Post('/')
  async addGroup() {}
}
