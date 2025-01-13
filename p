<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Selamat Datang di benara</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f0f2f5;
        }

        .container {
            width: 100%;
            max-width: 420px;
            padding: 1rem;
            border-radius: 16px;
            background: white;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            margin: 0.5rem;
        }

        .illustration {
            width: 100%;
            max-width: 200px;
            margin: 0 auto 1rem;
            display: block;
        }

        h1 {
            color: #00a3c4;
            text-align: center;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }

        .subtitle {
            text-align: center;
            color: #4b6b74;
            margin-bottom: 1rem;
            font-size: 1rem;
            line-height: 1.4;
            font-weight: bold;
        }

        .form-group {
            margin-bottom: 1rem;
        }

        .form-control {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 0.9rem;
            transition: border-color 0.3s;
        }

        .form-control:focus {
            outline: none;
            border-color: #00a3c4;
        }

        .btn {
            width: 100%;
            padding: 0.75rem;
            background: #00a3c4;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: background 0.3s;
        }

        .btn:hover {
            background: #008db0;
        }

        @media (min-width: 768px) {
            .container {
                display: grid;
                grid-template-columns: 1.2fr 1fr;
                max-width: 1100px;
                gap: 3rem;
                align-items: center;
                padding: 3rem;
            }

            .illustration {
                max-width: 400px;
            }

            .illustration-container {
                padding: 2rem;
                display: flex;
                justify-content: center;
            }

            .form-container {
                padding: 2rem;
                max-width: 480px;
            }

            h1 {
                font-size: 2.2rem;
                margin-bottom: 2.5rem;
            }

            .subtitle {
                font-size: 1,2rem;
                margin-bottom: 2.5rem;
                line-height: 1.6;
            }

            .form-group {
                margin-bottom: 2rem;
            }

            .form-control {
                padding: 1.2rem;
                font-size: 1.1rem;
                border-radius: 12px;
            }

            .btn {
                padding: 1.2rem;
                font-size: 1.1rem;
                border-radius: 12px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="illustration-container">
            <img src="asset/Desain tanpa judul_20250112_124719_0000.svg" alt="Students studying" class="illustration" />
        </div>
        <div class="form-container">
            <h1>Selamat Datang</h1>
            <p class="subtitle">
                Benara adalah website yang dirancang khusus untuk belajar kisah nabi dan rasul untuk anak.
                Web ini berkarakter kids friendly.
            </p>
            <form id="loginForm" onsubmit="return handleSubmit(event)">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Nama" id="nama" required />
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Sekolah" id="sekolah" required />
                </div> <button type="submit" class="btn">Masuk</button>
            </form>
        </div>
    </div>

    <script>
       
            function handleSubmit(event) {
                event.preventDefault();

            const nama = document.getElementById('nama').value;
            const sekolah = document.getElementById('sekolah').value;

            if (nama && sekolah) {
                // Simpan nama dan sekolah ke localStorage (opsional)
                localStorage.setItem('nama', nama);
            localStorage.setItem('sekolah', sekolah);

            // Arahkan ke beranda.html
            window.location.href = 'beranda.html';
        }

            return false;
    }
    </script>
        
    
</body>

</html>