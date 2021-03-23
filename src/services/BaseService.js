class DatabaseService {

  async ObterTodos(attributes) {
    return await this.AbstractClass.findAll({
      ...attributes
    });
  }

  async ObterPorId(id, attributes) {
    if (!id) {
      return undefined;
    }
    return await this.AbstractClass.findByPk(id, {
      ...attributes
    });
  }

  Inserir(data) {
    if (!data) {
      return undefined;
    }
    return this.AbstractClass.create(data);
  }

  Editar(data) {
    if (!data.id) {
      return undefined;
    }
    return this.AbstractClass.update(data, {
      where: {
        id: data.id
      }
    });
  }

  async Deletar(id) {
    if (!id) {
      return undefined;
    }
    // O objeto não é deletado, apenas a coluna deletedAt é atualizada para o tempo atual
    // cliente.destroy();
    // O objeto é deletado
    return await this.AbstractClass.destroy({
      where: {
        id
      },
      force: true
    });
  }
  
}

module.exports = DatabaseService;