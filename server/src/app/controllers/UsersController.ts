import { Request, Response } from 'express';

import { AppError } from '../../shared/errors/AppError';
import { UsersService } from '../services/UsersService';
import { schemaUserCreate } from '../validations/userSchema';
import { userRender } from '../views/templates/userRender';

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { username, email, password } = request.body;
    const avatarUser = request.file.filename;

    const avatarUserUrl = process.env.APP_FILES + avatarUser;

    try {
      await schemaUserCreate.validate(
        {
          username,
          email,
          avatarUserUrl,
          password,
        },
        { abortEarly: false },
      );
    } catch (error) {
      throw new AppError(error);
    }

    const usersService = new UsersService();

    const user = await usersService.create({
      username,
      email,
      avatarUserUrl,
      password,
    });

    await usersService.sendVerificationEmail({
      username,
      email,
      id: user.id,
    });

    return response.status(201).json(userRender.render(user));
  }

  async verifyEmail(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const usersService = new UsersService();
    const { message } = await usersService.emailConfirmation(id);

    return response.json({ message });
  }
}

export { UsersController };
