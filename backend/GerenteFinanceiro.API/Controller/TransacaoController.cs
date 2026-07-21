using GerenteFinanceiro.API.Models;
using GerenteFinanceiro.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace GerenteFinanceiro.API.Controllers
{
    /*
     Controller responsável por expor os endpoints (rotas HTTP) de Transações.
     */
    [Route("api/[controller]")]
    [ApiController]
    public class TransacoesController : ControllerBase
    {
        private readonly ITransacaoService _service;

        /*
         Injeta o serviço de transações no controller para processar as requisições sem a lógica do db diretamente aqui.
         */
        public TransacoesController(ITransacaoService service)
        {
            _service = service;
        }

        /*
         EndPoint GET: /api/transacoes
         * Chama o serviço para buscar os dados e retorna a lista com o status HTTP 200 (OK).
         */
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var transacoes = await _service.BuscarTodasAsync();
            return Ok(transacoes);
        }

        /*
         EndPoint POST: /api/transacoes
         Recebe um objeto JSON do React, envia para o serviço salvar
         e retorna o status HTTP 201 (Created) junto com os dados recém-salvos.
         */
        [HttpPost]
        public async Task<IActionResult> Post(Transacao transacao)
        {
            var novaTransacao = await _service.AdicionarAsync(transacao);
            return CreatedAtAction(nameof(Get), new { id = novaTransacao.Id }, novaTransacao);
        }

        /*
         EndPoint DELETE: /api/transacoes/{id}
         Recebe o id pela URL e tenta deletar através do service.
         Retorna 204 (No Content) se teve sucesso, ou 404 (Not Found) se o id for inválido.
         */
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var sucesso = await _service.DeletarAsync(id);

            if (!sucesso) return NotFound("Transação não encontrada.");

            return NoContent();
        }
    }
}