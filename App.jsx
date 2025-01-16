import React, { useState } from 'react';
import './styles/App.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('<API-KEY>');

function App() {
	const [ingredients, setIngredients] = useState('');
	const [recipe, setRecipe] = useState('');
	const [loading, setLoading] = useState(false);
	const [missingTemplate, setMissingTemplate] = useState('');
	const [sexPosition, setSexPosition] = useState('');
	const [activeTab, setActiveTab] = useState('recipe');

	const generateRecipe = async () => {
		try {
			setLoading(true);
			const model = genAI.getGenerativeModel({ model: "gemini-pro" });

			const prompt = `Şu malzemelerle yapılabilecek bir yemek tarifi öner: ${ingredients}. 
										 Lütfen tarifi şu formatta ver:
										 - Yemek Adı
										 - Malzemeler
										 - Hazırlanış
										 - Pişirme Süresi`;

			const result = await model.generateContent(prompt);
			const response = await result.response;
			const text = response.text();
			setRecipe(text);
		} catch (error) {
			console.error('Tarif oluşturulurken hata:', error);
			setRecipe('Üzgünüm, tarif oluşturulurken bir hata oluştu.');
		} finally {
			setLoading(false);
		}
	};

	const generateMissingTemplate = async () => {
		try {
			setLoading(true);
			const model = genAI.getGenerativeModel({ model: "gemini-pro" });

			const prompt = `Özlemekle ilgili duygusal ve anlamlı bir cümle yazar mısın?`;

			const result = await model.generateContent(prompt);
			const response = await result.response;
			const text = response.text();
			setMissingTemplate(text);
		} catch (error) {
			console.error('Şablon oluşturulurken hata:', error);
			setMissingTemplate('Üzgünüm, şablon oluşturulurken bir hata oluştu.');
		} finally {
			setLoading(false);
		}
	};

	const generateSexPosition = async () => {
		try {
			setLoading(true);
			const model = genAI.getGenerativeModel({ model: "gemini-pro" });

			const prompt = `Harry Potterla ilgili rastgele bir sihir öner ve detaylı açıkla. Lütfen şu formatta ver:
                           - Sihir Adı
						   - Büyü Kelimesi
                           - Detaylı Açıklama`;

			const result = await model.generateContent(prompt);
			const response = await result.response;
			const text = response.text();
			setSexPosition(text);
		} catch (error) {
			console.error('Pozisyon önerisi oluşturulurken hata:', error);
			setSexPosition('Üzgünüm, öneri oluşturulurken bir hata oluştu.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<header className="header">
				<h1>Akıllı Öneri Sistemi</h1>
				<div className="tab-container">
					<button
						className={`tab-button ${activeTab === 'recipe' ? 'active' : ''}`}
						onClick={() => setActiveTab('recipe')}
					>
						Tarif Önerileri
					</button>
					<button
						className={`tab-button ${activeTab === 'missing' ? 'active' : ''}`}
						onClick={() => setActiveTab('missing')}
					>
						Özlemekle İlgili Şablon
					</button>
					<button
						className={`tab-button ${activeTab === 'magic' ? 'active' : ''}`}
						onClick={() => setActiveTab('magic')}
					>
						Harry Potter Sihir Öner
					</button>
				</div>
			</header>

			<div className="container">
				{activeTab === 'recipe' ? (
					<>
						<div className="ingredients-form">
							<div className="input-container">
								<input
									type="text"
									className="ingredient-input"
									value={ingredients}
									onChange={(e) => setIngredients(e.target.value)}
									placeholder="Malzemeleri virgülle ayırarak girin (örn: domates, soğan, patates)"
								/>
								<button
									className="submit-button"
									onClick={generateRecipe}
									disabled={loading}
								>
									Tarif Oluştur
								</button>
							</div>
						</div>

						{loading && (
							<div className="loading">
								Tarifler oluşturuluyor...
							</div>
						)}

						{recipe && !loading && (
							<div className="recipe-card">
								<pre style={{ whiteSpace: 'pre-wrap' }}>{recipe}</pre>
							</div>
						)}
					</>
				) : activeTab === 'missing' ? (
					<div className="missing-template-container">
						<button
							className="submit-button"
							onClick={generateMissingTemplate}
							disabled={loading}
						>
							Özlem Şablonu Oluştur
						</button>

						{loading && (
							<div className="loading">
								Şablon oluşturuluyor...
							</div>
						)}

						{missingTemplate && !loading && (
							<div className="template-card">
								<p>{missingTemplate}</p>
							</div>
						)}
					</div>
				) : (
					<div className="magic-position-container">
						<button
							className="submit-button"
							onClick={generateSexPosition}
							disabled={loading}
						>
							Sihir Öner
						</button>

						{loading && (
							<div className="loading">
								Öneri oluşturuluyor...
							</div>
						)}

						{sexPosition && !loading && (
							<div className="position-card">
								<pre style={{ whiteSpace: 'pre-wrap' }}>{sexPosition}</pre>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
