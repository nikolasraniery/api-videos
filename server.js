import { fastify } from 'fastify';
import { DatabasePostgres } from './database-memory.js';

const server = fastify();

const database = new DatabasePostgres();


server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body;

    try {
        await database.create({ title, description, duration });
    
        return reply.status(201).send('vídeo enviado com sucesso!');
    } catch (error) {
        return reply.status(500).send({error: 'Erro ao enviar vídeo'});
    }

});

server.get('/videos', async (request, reply) => {
    const { search } = request.query;

    try {
        if (search) {
            const videos = await database.list(search);
            return videos
        }
        const videos = await database.list();
        return videos
        
    } catch (error) {
        return reply.status(500).send({error: 'Erro buscar vídeos'});
    }
})

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id;
    const { title, description, duration} = request.body;

    try {
        database.update(videoId, { title, description, duration });
        return reply.status(204).send('Vídeo atualizado com sucesso!');
    } catch (error) {
        return reply.status(500).send({error: 'Erro ao atualizar vídeo'});
    }
});

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id;

    try {
        database.delete(videoId);
        return reply.status(200).send('Vídeo deletado com sucesso!');
    } catch (error) {
        return reply.status(500).send({error: 'Erro ao deletar vídeo'});
    }
});

server.listen({
    port: process.env.PORT ?? 3333,
});
