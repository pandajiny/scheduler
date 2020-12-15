import {
  Controller,
  Get,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  Delete,
  Post,
  Put,
} from '@nestjs/common';
import { ApiService } from 'src/api/api.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GroupService } from 'src/group/group.service';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private groupService: GroupService,
    private apiService: ApiService,
  ) {}
  // @Get()
  // async getUsers()

  @Get()
  async getUsers(@Request() req): Promise<HttpResponse<User>> {
    const { email } = req.query;

    console.log(`users requested from ${email}`);
    const user = await this.usersService.findUserFromEmail(email).catch(err => {
      throw new HttpException(err, HttpStatus.UNAUTHORIZED);
    });

    return this.apiService.httpResponse(user);
  }

  // @Get('/:uid')
  // async getUser(@Request() req) {
  //   const { uid } = req.params;
  //   console.log(`get user from uid : ${uid}`);
  //   const user = await this.usersService
  // }

  @Get('/:uid/groups')
  async getGroupsFromUser(@Request() req): Promise<HttpResponse<Group[]>> {
    const { uid } = req.params;
    console.log(`groups request from ${uid}`);

    const groups = await this.groupService.getGroupsFromUid(uid).catch(err => {
      console.error(err);
      throw new HttpException(`${err}`, HttpStatus.FORBIDDEN);
    });

    console.log(`got ${groups.length} of groups from ${uid}`);

    return {
      ok: true,
      data: groups,
    };
  }

  @Get('/:uid/groups/:groupId')
  async getGroup() {}

  @Post('/:uid/groups')
  async createGroup() {}

  @Delete('/:uid/groups/:groupId')
  async deleteGroup(@Request() req) {
    const { group_id: groupId } = req.params;
    console.log(groupId);
    return 'not yet';
  }

  @Put('/:uid/groups/:groupId')
  async updateGroup(@Request() req) {}

  @Get('/:uid/groups/:groupId/todos')
  async getTodosFromGroup() {}

  @Get('profile')
  getProfile(@Request() req) {
    console.log(`profile requested`, req.user);
    return req.user;
  }
}
