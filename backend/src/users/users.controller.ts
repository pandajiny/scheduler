import {
  Controller,
  Get,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GroupService } from 'src/group/group.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private groupService: GroupService) {}
  // @Get()
  // async getUsers()

  @Get('/:uid')
  async getUser() {
    return 'get user';
  }

  @Get('/:uid/groups')
  async getGroupsFromUser(@Request() req): Promise<HttpResponse<Group[]>> {
    const { uid } = req.params;

    const groups = await this.groupService.getGroupsFromUid(uid).catch(err => {
      throw new HttpException(`${err}`, HttpStatus.FORBIDDEN);
    });

    return {
      ok: true,
      data: groups,
    };
  }

  @Get('/:uid/groups/:groupId')
  async getGroup() {}

  @Get('/:uid/groups/:groupId/todos')
  async getTodosFromGroup() {}

  @Get('profile')
  getProfile(@Request() req) {
    console.log(`profile requested`, req.user);
    return req.user;
  }
}
