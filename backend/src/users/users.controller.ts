import { Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor() {}

  // @Get('/:uid/groups')
  // async getGroupsFromUser(@Request() req): Promise<Group[]> {
  //   const { uid } = req.params;

  //   const groups = await this.groupService.getGroupsFromUid(uid).catch(err => {
  //     console.error(err);
  //     throw new BadRequestException(err);
  //   });

  //   return groups;
  // }

  // @Get('/:uid/groups/:groupId')
  // async getGroup() {}

  // @Post('/:uid/groups')
  // async addGroup(@Request() req): Promise<HttpResponse<ActionResult>> {
  //   const request = req.body as AddGroupRequest;

  //   const result = await this.groupService.addGroup(request).catch(err => {
  //     console.error(err);
  //     throw new HttpException(`${err}`, HttpStatus.FORBIDDEN);
  //   });

  //   return this.apiService.httpResponse(result);
  // }

  // @Delete('/:uid/groups/:groupId')
  // async deleteGroup(@Request() req) {
  //   const { groupId } = req.params;
  //   const result = await this.groupService.deleteGroup(groupId).catch(err => {
  //     console.error(err);
  //     throw new HttpException(`${err}`, HttpStatus.FORBIDDEN);
  //   });

  //   return this.apiService.httpResponse(result);
  // }

  // @Put('/:uid/groups/:groupId')
  // async updateGroup(@Request() req): Promise<HttpResponse<ActionResult>> {
  //   const group: Group = req.body;
  //   console.log(`update group reques / group id :  ${group.group_id}`);
  //   const result = await this.groupService.updateGroup(group).catch(err => {
  //     console.error(err);
  //     throw new HttpException(`${err}`, HttpStatus.FORBIDDEN);
  //   });
  //   console.log(`update group done / group id : ${group.group_id}`);
  //   return this.apiService.httpResponse(result);
  // }

  // @Get('/:uid/groups/:groupId/todos')
  // async getTodosFromGroup() {}

  // @Get('profile')
  // getProfile(@Request() req) {
  //   console.log(`profile requested`, req.user);
  //   return req.user;
  // }
}
