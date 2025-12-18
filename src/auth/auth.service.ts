import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  
    constructor(
      @InjectRepository(User)
      private readonly  userRepository: Repository<User>,
        ) {}
  
  async create(createUserDto: CreateUserDto) {
    


    try {

      const { password, ...userData} = createUserDto;
      const user =  this.userRepository.create({
        ...userData,
        password:  bcrypt.hashSync(password, 10 )

      });

      await this.userRepository.save(user); 
      delete user.password;
      return user;
      
    } catch (error) {
      console.log(error);
      throw 'Error al crear el usuario';    
    }
    
    return 'Usuario creado';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, createProductDto: User) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
