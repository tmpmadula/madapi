import { User, UserDocument } from './users.schema';

import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FileUploadService } from '../common/services/file-upload.service';
import { InjectModel, Model } from 'nestjs-dynamoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,

    private readonly fileUploadService: FileUploadService,
  ) {
    super(userModel);
  }

  async create(createDto: CreateUserInput): Promise<User> {
    const newUser = { ...createDto, isActive: true } as any;

    if (createDto.image) {
      newUser.image = await this.fileUploadService.saveFile(createDto.image);
    }

    const user = new this.userModel(newUser);
    try {
      await user.save();
    } catch (e) {
      if (newUser.image) {
        this.fileUploadService.deleteFile(newUser.image);
      }
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await super.findOne({ email });
  }
}
