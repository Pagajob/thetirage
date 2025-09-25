@@ .. @@
         <div className="text-center mb-12">
           <div className="flex justify-center items-center mb-4">
            <img
              src="/Tirage.svg"
              alt="Thetirage"
              className="h-12 w-auto mr-4"
            />
            <h1 className="text-4xl font-bold text-gray-900">Espace Promoteur</h1>
           </div>
           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
             Gagnez 20% de commission sur chaque vente générée par vos liens d'affiliation
           </p>
         </div>
@@ .. @@
             <button
               onClick={generatePromoLink}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-700 transition-colors"
             >
@@ .. @@
                   <button
                     onClick={() => copyToClipboard(generatedLink)}
                    className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                   >