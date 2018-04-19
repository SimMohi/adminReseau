<DOCTYPE html>
    <html>
    <head>

    </head>
    <body>
        <?php
        try

        {
            $dbName = 'b2b';
            $host = '54.37.65.61';
            $utilisateur = 'root';
            $motDePasse = 'ephecpower';
            $port='3306';
            $dns = 'mysql:host='.$host .';dbname='.$dbName.';port='.$port;
            $connection = new PDO($dns, $utilisateur, $motDePasse );
        }
        catch(Exception $e)
        {
            die('Erreur : '.$e->getMessage());
        }
        $reponse = $connection->query("SELECT * FROM produits");

        while ($donnees = $reponse->fetch())
        {
            ?>

            <section class='rep'>
                <img src="/IMG/<?php echo $donnees['img']; ?>" alt="<?php echo $donnees['nom']; ?>" height=42 width=    42><br>
                <?php echo $donnees['nom'];?> <br>
                Prix : <?php echo $donnees['prix']; ?> €
            </section>
            <?php
        }
        //return $rep;
        $reponse->closeCursor();
        ?>
    </body>
    </html>
</DOCTYPE>
