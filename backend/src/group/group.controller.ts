import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GroupService } from './group.service';

@UseGuards(JwtAuthGuard)
@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Get()
  async getGroupLists(@Request() req): Promise<Group[]> {
    // console.log(
    //   `
    //       helloGGUAK GGUAK GGUAK GGUAKKKK GUUUUUUUUUUUUUUUAK GGUAK GGUUAAKK GGGUAK GGUAK GGUAK
    //       helloGGUAK GGUAK GGUAK GGUAKKKK GUUUUUUUUUUUUUUUAK GGUAK GGUUAAKK GGGUAK GGUAK GGUAK
    //       hwanjiny saranghae `,
    // );

    const user = req.user as RequestUser;
    console.log(`group list requested ${user}`);

    const result = await this.groupService.getGroupLists(user.uid);
    console.log(`get ${result.length} group items from ${user.email} has done`);

    return result;
  }

  @Post()
  async addGroup(@Request() req, @Body() body): Promise<ActionResult> {
    const request = body as AddGroupRequest;
    const user = req.user as User;
    console.log(`add group requested from ${user.uid} ${request.groupName}`);

    const result = await this.groupService.addGroup(
      user.uid,
      request.groupName,
    );
    console.log(`adding group done ${result.message}`);

    return {
      ok: true,
      message: result.message,
    };
  }
}
