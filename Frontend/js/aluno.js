class Aluno {
    constructor(apelido, endereco, turings) {
        this.apelido = apelido;
        this.endereco = endereco;
        this.turings = turings;
    }

    cmpAlunos(aluno) {
        if (this.turings > aluno.turings) {
            return 1;
        } else if (this.turings < aluno.turings) {
            return -1;
        } else {
            if (this.apelido > aluno.apelido) {
                return 1
            } else {
                return -1;
            }
        }
    }
}