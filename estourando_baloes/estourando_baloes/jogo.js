

var timerId = null; //variável que vai ser reservada na função timeout

function iniciaJogo(){
	var url = window.location.search;
	
	var nivel_jogo = url.replace("?", "");

	var tempo_segundos = 0;

	if(nivel_jogo == 1){
		// 1 fácil -> 120segundos
		tempo_segundos = 120;
	}

	if(nivel_jogo == 2){
		// 2 normal -> 60segundos
		tempo_segundos = 60;
	}
	
	if(nivel_jogo == 3){
		//3 difícil -> 30segundos
		tempo_segundos = 30;
	}

	//inserindo segundos no span

	document.getElementById('cronometro').innerHTML = tempo_segundos;

	// quantidade de balões
	var qtde_baloes = 20;

	cria_baloes(qtde_baloes);

	//imprimir baloes inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos + 1)

}

function contagem_tempo(segundos){

	segundos = segundos - 1;

	if(segundos == -1){
		clearTimeout(timerId); //para a execução da função setTimeout
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

	timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
}

function game_over(){
	alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo');
}

function cria_baloes(qtde_baloes){
	for(var i = 1; i <= qtde_baloes; i++){

		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id = 'b'+ i;
		balao.onclick = function(){ estourar(this);};

		document.getElementById('cenario').appendChild(balao);
	}
}

function estourar(e){

	var id_balao = e.id;

	document.getElementById(id_balao).setAttribute("onclick", "");
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

	pontuacao(-1);
}

function remove_eventos_baloes(){
	var i = 1; //contado para recuperar baloes por id

	//percorre os elementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
	while(document.getElementById('b'+i)){
		//retira o evento onclick do elemento
		document.getElementById('b'+i).onclick = '';
		i++; //faz a interação da variável i
	}
}

function pontuacao(acao){
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros += acao;
	baloes_estourados -= acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros);

}

function situacao_jogo(baloes_inteiros){
	if(baloes_inteiros == 0){
	alert('Parabéns, você conseguiu estourar todos os baloes a tempo');
	parar_jogo();

		}
}

function parar_jogo(){
	clearTimeout(timerId);
}

function game_over(){
	remove_eventos_baloes();
	alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo');
}situacao_jogo;s