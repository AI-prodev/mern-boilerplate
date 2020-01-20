// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';

import { Container } from 'typedi';

import Responder from '../helpers/responder';

const responderInstance = Container.get(Responder);

class NotesController {
  public async getNotes(req: Request, res: Response) {
    try {
      const notes: any = [{ id: 1, title: 'note one' }];
      if (notes.length > 0) {
        responderInstance.setSuccess(
          200,
          'notes are successfully retrieved',
          notes,
        );
      } else {
        responderInstance.setSuccess(200, 'No noptes found');
      }
      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error);
      return responderInstance.send(res);
    }
  }

  public async getNote(req: Request, res: Response) {
    const { id } = req.params;

    if (!Number(id)) {
      responderInstance.setError(400, 'please provide a valid numeric value');
      return responderInstance.send(res);
    }

    try {
      const note = {};

      if (!note) {
        responderInstance.setError(404, `cannot find note with the id ${id}`);
      } else {
        responderInstance.setSuccess(200, 'found note', note);
      }
      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(404, error);
      return responderInstance.send(res);
    }
  }

  public async updateNote(req: Request, res: Response) {
    const newNote = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      responderInstance.setError(400, 'please provide a valid numeric value');
      return responderInstance.send(res);
    }
    try {
      const updatedNote = newNote;
      if (!updatedNote) {
        responderInstance.setError(404, `cannot find note with the id: ${id}`);
      } else {
        responderInstance.setSuccess(200, 'note updated', updatedNote);
      }
      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(404, error);
      return responderInstance.send(res);
    }
  }

  public async addNote(req: Request, res: Response) {
    if (!req.body.title || !req.body.description) {
      responderInstance.setError(400, 'some details are missing');
      return responderInstance.send(res);
    }
    const newNote = req.body;
    try {
      const createdNote = newNote;
      responderInstance.setSuccess(
        201,
        'note has been added successfully',
        createdNote,
      );
      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error.message);
      return responderInstance.send(res);
    }
  }

  public async deleteNote(req: Request, res: Response) {
    const { id } = req.params;

    if (!Number(id)) {
      responderInstance.setError(400, 'please provide a valid numeric value');
      return responderInstance.send(res);
    }

    try {
      const noteToDelete = {};

      if (noteToDelete) {
        responderInstance.setSuccess(200, 'note has been deleted successfully');
      } else {
        responderInstance.setError(
          404,
          `note with the id ${id} cannot be found`,
        );
      }
      return responderInstance.send(res);
    } catch (error) {
      responderInstance.setError(400, error);
      return responderInstance.send(res);
    }
  }
}

export default NotesController;