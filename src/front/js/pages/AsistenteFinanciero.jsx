import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/AsistenteFinanciero.css';

export const AsistenteFinanciero = () => {
	const { actions } = useContext(Context);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);

	const recommendedQuestions = [
		"¿Cuál es el supermercado más barato cerca de mí?",
		"¿Cuánto es 10 euros en dólares?",
		"¿Cómo puedo ahorrar más?",
		"¿Qué categoría de gasto representa más de mis ingresos?",
		"¿Tengo saldo suficiente para salir a cenar esta semana?",
		"¿En qué días gasto más dinero?",
		"¿Cuál es mi gasto promedio en transporte?",
		"¿Mis gastos en comida aumentaron este mes?",
		"¿Tengo suscripciones duplicadas?",
		"¿Puedo permitirme un viaje este mes?",
		"¿Cuántas veces comí fuera este mes?",
		"¿Cuánto pagué en suscripciones el mes pasado?",
		"¿Qué porcentaje de mis ingresos va a ahorro?",
		"¿Cuál fue el gasto más alto esta semana?",
		"¿Cuánto gasto en cafés al mes?",
		"¿Estoy gastando más de lo que gano?",
		"¿Qué gastos puedo recortar fácilmente?",
		"¿Cuánto gasté en Amazon este año?",
		"¿Cuánto me queda para alcanzar mi objetivo de ahorro?",
		"¿Cuál fue mi gasto más impulsivo este mes?",
		"¿Qué gastos son innecesarios en mi historial?",
		"¿Cuánto he gastado en ropa este trimestre?",
		"¿Tengo alguna factura pendiente?",
		"¿Cómo puedo optimizar mis gastos fijos?",
		"¿Me puedo permitir comprar un nuevo móvil?",
		"¿Cuánto puedo gastar al día sin pasarme del presupuesto?",
		"¿Estoy cumpliendo mis metas de ahorro?",
		"¿Cuánto gasto en ocio comparado con transporte?",
		"¿Tengo espacio para un gasto inesperado?",
		"¿He recibido todos mis ingresos este mes?"
	];

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!input.trim()) return;

		const userMessage = { role: "user", content: input };
		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setLoading(true);

		try {
			const data = await actions.askAIQuestion(input);
			const aiMessage = { role: "ai", content: data.answer };
			setMessages((prev) => [...prev, aiMessage]);
		} catch (error) {
			setMessages((prev) => [...prev, { role: "ai", content: "Lo siento, hubo un error inesperado." }]);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="transactions-container">
			<header className="transactions-header">
				<div className="container my-4">
					<div className="row align-items-center">
						<div className="col">
							<h2>Asistente Financiero</h2>
							<p>Consulta lo que necesites saber</p>
						</div>
					</div>
				</div>
			</header>

			<div className="ai-chat card p-3">
				<div className="recommended-questions mb-3">
					<p><strong>Preguntas recomendadas:</strong></p>
					<div className="d-flex flex-wrap gap-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
						{recommendedQuestions.map((q, i) => (
							<button key={i} className="btn btn-outline-secondary btn-sm" onClick={() => setInput(q)}>
								{q}
							</button>
						))}
					</div>
				</div>

				<div className="chat-window border rounded p-3 mb-3" style={{ minHeight: "300px", maxHeight: "400px", overflowY: "auto" }}>
					{messages.map((msg, i) => (
						<div key={i} className={`chat-message ${msg.role}`}>
							<strong>{msg.role === "user" ? "Tú" : "IA"}:</strong> {msg.content}
						</div>
					))}
					{loading && <div><em>IA está escribiendo...</em></div>}
				</div>

				<form onSubmit={handleSubmit} className="d-flex gap-2">
					<input
						type="text"
						className="form-control"
						placeholder="Haz una pregunta..."
						value={input}
						onChange={(e) => setInput(e.target.value)}
						required
					/>
					<button className="btn btn-primary" style={{ backgroundColor: '#2D3748', color: '#E2E8F0' }}>
						Enviar
					</button>
				</form>
			</div>
		</div>
	);
};
