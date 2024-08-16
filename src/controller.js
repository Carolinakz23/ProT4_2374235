import { pool } from './database.js';

class LibroController {
  
  // Obtener todos los libros
  async getAll(req, res) {
    try {
      const [result] = await pool.query('SELECT * FROM libros');
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los libros', error });
    }
  }

  // Obtener un libro por ID
  async getOne(req, res) {
    const { id } = req.params;
    try {
      const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);

      if (result.length === 0) {
        res.status(404).json({ message: 'Libro no encontrado' });
      } else {
        res.json(result[0]);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el libro', error });
    }
  }

  // Agregar un nuevo libro
  async add(req, res) {
    try {
      const { nombre, autor, categoria, año_publicacion, ISBN } = req.body;
      const [result] = await pool.query(
        'INSERT INTO libros (nombre, autor, categoria, año_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)',
        [nombre, autor, categoria, año_publicacion, ISBN]
      );
      res.json({ id_insertado: result.insertId });
    } catch (error) {
      res.status(500).json({ message: 'Error al agregar el libro', error });
    }
  }

  // Eliminar un libro por ISBN
  async delete(req, res) {
    const { ISBN } = req.body;
    try {
      const [result] = await pool.query('DELETE FROM libros WHERE ISBN = ?', [ISBN]);

      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Libro no encontrado' });
      } else {
        res.json({ registros_eliminados: result.affectedRows });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el libro', error });
    }
  }

  // Actualizar un libro
  async update(req, res) {
    const { id, nombre, autor, categoria, año_publicacion, ISBN } = req.body;
    try {
      const [result] = await pool.query(
        'UPDATE libros SET nombre = ?, autor = ?, categoria = ?, año_publicacion = ?, ISBN = ? WHERE id = ?',
        [nombre, autor, categoria, año_publicacion, ISBN, id]
      );

      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Libro no encontrado o sin cambios' });
      } else {
        res.json({ registros_actualizados: result.affectedRows });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el libro', error });
    }
  }
}

export const libro = new LibroController();
