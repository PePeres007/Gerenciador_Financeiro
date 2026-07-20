using GerenteFinanceiro.API.Models;
using GerenteFinanceiro.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace GerenteFinanceiro.API.Controllers
{
    /*
     Atua como a "porta de entrada" da API para a rota de Pessoas.
     Ela recebe as requisições HTTP do front-end (React), repassar as regras
     para o Service processar e devolver as respostas HTTP adequadas (como 200, 201, 204, 404).
     */
    [ApiController]
    [Route("api/[controller]")]
    public class PessoaController : ControllerBase
    {
        private readonly IPessoaService _pessoaService;

        /*
         Construtor:
         Recebe o serviço de pessoa por injeção de dependência, garantindo que o 
         controlador foque apenas em roteamento e status HTTP, isolando ele das regras do Db.
         */
        public PessoaController(IPessoaService pessoaService)
        {
            _pessoaService = pessoaService;
        }

        /*
         Endpoint GET: /api/pessoa
         Função: Retorna a listagem de todas as pessoas cadastradas.
         Lógica: Chama o método GetAllAsync do service e encapsula o resultado no status HTTP 200 (Ok).
         */
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var pessoas = await _pessoaService.GetAllAsync();
            return Ok(pessoas);
        }

        /*
         Endpoint POST: /api/pessoa
         Função: Cadastra uma nova pessoa.
         Lógica: 
         1. Deserializa os dados JSON enviados no corpo da requisição ([FromBody]) para um objeto Pessoa.
         2. Aciona o service para persistir os dados.
         3. Retorna o status HTTP 201 (Created), informando ao front-end o recurso recém-criado.
         */
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Pessoa pessoa)
        {
            var novaPessoa = await _pessoaService.CreateAsync(pessoa);

            return CreatedAtAction(nameof(Get), new { id = novaPessoa.Id }, novaPessoa);
        }

        /*
         Endpoint DELETE: /api/pessoa/{id}
         Função: Remove uma pessoa específica baseada no id da URL.
         Lógica:
         1. Solicita a deleção ao service utilizando o id providenciado.
         2. Se a deleção falhar (false), devolve um erro HTTP 404 (Not Found).
         3. Se for bem-sucedida, devolve HTTP 204 (No Content), indicando a conclusão da tarefa com sucesso.
         */
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var sucesso = await _pessoaService.DeleteAsync(id);

            if (!sucesso)
            {
                return NotFound(new { mensagem = "Pessoa não encontrada." });
            }

            return NoContent();
        }
    }
}