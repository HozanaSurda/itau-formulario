// MASCARAS DE INPUT
//ref: https://pt.stackoverflow.com/questions/199264/como-faco-uma-mascara-para-um-input/199276

function maskManager(objeto, mascara) {
	objeto.value = mascara(objeto.value);
}

function maskTelefoneCelular(tel) {
	return maskTelefoneGenerica(tel, 11);
}

function maskTelefoneFixo(tel) {
	return maskTelefoneGenerica(tel, 10);
}

function maskTelefoneGenerica(tel, maxTamanho) {
	tel = tel.replace(/\D/g, '');
	if (tel.length > maxTamanho) {
		tel = tel.substring(0, maxTamanho);
	}
	tel = tel.replace(/^(\d)/, '($1');
	tel = tel.replace(/(.{3})(\d)/, '$1)$2');
	if (tel.length == 9) {
		tel = tel.replace(/(.{1})$/, '-$1');
	} else if (tel.length == 10) {
		tel = tel.replace(/(.{2})$/, '-$1');
	} else if (tel.length == 11) {
		tel = tel.replace(/(.{3})$/, '-$1');
	} else if (tel.length == 12) {
		tel = tel.replace(/(.{4})$/, '-$1');
	} else if (tel.length > 12) {
		tel = tel.replace(/(.{4})$/, '-$1');
	}
	return tel;
}

function maskCPF(cpf) {
	cpf = cpf.replace(/\D/g, '');
	if (cpf.length > 11) {
		cpf = cpf.substring(0, 11);
	}
	cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
	cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
	cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
	return cpf;
}

function maskCEP(cep) {
	cep = cep.replace(/\D/g, '');
	if (cep.length > 8) {
		cep = cep.substring(0, 8);
	}
	cep = cep.replace(/^(\d{2})(\d)/, '$1.$2');
	cep = cep.replace(/\.(\d{3})(\d)/, '.$1-$2');
	return cep;
}

function simularSubmit() {
	const camposParaValidar = ['cnome', 'ccpf', 'crua', 'cnum', 'ctel'];
	const msgErros = [
		'Nome não pode ficar vazio.',
		'CPF não pode ficar vazio.',
		'Logradouro não pode ficar vazio.',
		'Número não pode ficar vazio.',
		'Telefone celular não pode ficar vazio.',
	];

	let erros = [];
	for (i = 0; i < camposParaValidar.length; i += 1) {
		const campoHTML = document.getElementById(camposParaValidar[i]);
		campoHTML.style.border = 'none'; // restaura o valor caso o campo ja ta em vermelho
		if (campoHTML.value.length === 0) {
			campoHTML.style.border = '2px solid red';
			erros.push(msgErros[i]);
		}
	}

	if (erros.length === 0) {
		alert('Seu cadastro foi feito com sucesso!');
	} else {
		alert(
			'Cadastro incompleto!\n\nPor favor, verifique os seguintes items:\n - ' +
				erros.join('\n - ') +
				'\n\nPreencha os campos em vermelho e tente novamente.'
		);
	}
}
