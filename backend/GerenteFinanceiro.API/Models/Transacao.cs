namespace GerenteFinanceiro.API.Models
{
    // enum para travar os tipos aceitos e evitar erros de digitação.
    public enum TipoTransacao
    {
        Receita = 1,
        Despesa = 2
    }

    public class Transacao
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public TipoTransacao Tipo { get; set; }
        public DateTime Data { get; set; } = DateTime.UtcNow;

        // Chave Estrangeira (O vínculo com a tabela de Pessoas)
        public int PessoaId { get; set; }

        // Propriedade de Navegação (Ignorada no JSON para evitar loop infinito na API)
        //[System.Text.Json.Serialization.JsonIgnore] Teste pelo erro
        public virtual Pessoa? Pessoa { get; set; }
    }
}