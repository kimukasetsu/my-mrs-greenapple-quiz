document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        document.getElementById('question1'),
        document.getElementById('question2'),
        document.getElementById('question3')
    ];
    const quizSection = document.getElementById('quiz-section');
    const resultSection = document.getElementById('result-section');
    const songTitle = document.getElementById('song-title');
    const songDescription = document.getElementById('song-description');
    const songLinkContainer = document.getElementById('song-link-container');
    const restartBtn = document.getElementById('restart-btn');

    let currentQuestionIndex = 0;
    let answers = {}; // ユーザーの回答を保存するオブジェクト

    // おすすめ楽曲データ
    // 各曲の description と embed_url を適切に埋めてください
    // embed_url はMrs. GREEN APPLE公式YouTubeチャンネルの動画から「共有」->「埋め込み」で取得できます
    const recommendations = {
        // 元気にノりたい
        "up_rock_positive": {
            title: "インフェルノ",
            description: `
                力強いバンドサウンドと疾走感が魅力！
                <br><br>
                アニメ主題歌としても大ヒットした、熱く燃え上がるような一曲です。気分を上げたい時にぴったり。
            `,
            embed_url: "https://www.youtube.com/embed/wfCcs0vLysk?"
        },
        "up_rock_deep": {
            title: "アウフヘーベン",
            description: `
                深いメッセージを力強いロックサウンドに乗せた一曲。
                <br><br>
                高揚感と共に思考を深めたい時にぴったりです。聴き終わった後に、新たな視点が見つかるかもしれません。
            `,
            embed_url: "https://www.youtube.com/embed/nszTmpcXiB8?"
        },
        "up_rock_love": {
            title: "ロマンチシズム",
            description: `
                情熱的なロックサウンドが、燃え上がるような恋心を表現しています。
                <br><br>
                恋愛の複雑さや美しさを深く感じたい時に、この曲が寄り添ってくれるでしょう。
            `,
            embed_url: "https://www.youtube.com/embed/RiDCIqF0-6Y?"
        },
        "up_rock_impression": {
            title: "ニュー・マイ・ノーマル",
            description: `
                新しい自分へ踏み出す力をくれる、感動的なロックナンバー。
                <br><br>
                不安を乗り越え、勇気を持って一歩を踏み出したい時に、心に響くメロディと歌詞があなたを後押しします。
            `,
            embed_url: "https://www.youtube.com/embed/E7YAf0O02Ms?"
        },

        "up_pop_positive": {
            title: "青と夏",
            description: `
                夏をテーマにした、爽やかでキャッチーな代表曲！
                <br><br>
                聴くと心が弾むような、青春のキラキラが詰まっています。晴れた日にドライブしながら聴くのがおすすめです。
            `,
            embed_url: "https://www.youtube.com/embed/m34DPnRUfMU?"
        },
        "up_pop_deep": {
            title: "ビターバカンス",
            description: `
                ポップなサウンドの中に、ふと立ち止まって考えたくなるような深さを持つ楽曲です。
                <br><br>
                夏の気だるさの中にも、新しい発見や気づきが潜んでいることを教えてくれます。
            `,
            embed_url: "https://www.youtube.com/embed/-6YeAmmRdoA?"
        },
        "up_pop_love": {
            title: "Love me,Love,you",
            description: `
                ストレートな愛情表現とポップなメロディが魅力。
                <br><br>
                キュートな世界観に浸りたい時や、大切な人に気持ちを伝えたい時にぴったりです。
            `,
            embed_url: "https://www.youtube.com/embed/FmDBhP4apbs?"
        },
        "up_pop_impression": {
            title: "鯨の唄",
            description: `
                壮大なスケールで描かれる、感動的なポップナンバー。
                <br><br>
                心揺さぶられる体験を求める時や、深い感情に浸りたい時に最適な一曲です。
            `,
            embed_url: "https://www.youtube.com/embed/9Sg24qRRoyo?"
        },

        "up_ballad_positive": {
            title: "Feeling",
            description: `
                温かいメロディと前向きなメッセージが心を包み込むバラード。
                <br><br>
                穏やかな気持ちで新しい一歩を踏み出したい時や、心を落ち着かせたい時に聴いてみてください。
            `,
            embed_url: "https://www.youtube.com/embed/mO28_pl7aAw?"
        },
        "up_ballad_deep": {
            title: "絶世生物",
            description: `
                生命の神秘や存在意義について深く考えさせるバラード。
                <br><br>
                壮大で哲学的な世界観に触れたい時に、あなたを別世界へといざないます。
            `,
            embed_url: "https://www.youtube.com/embed/qCb1p7P2nRs?"
        },
        "up_ballad_love": {
            title: "umbrella",
            description: `
                雨の日の情景が目に浮かぶような、切ないけれど温かいラブバラード。
                <br><br>
                大切な人との絆を感じたい時や、しっとりとした気分に浸りたい時に寄り添ってくれます。
            `,
            embed_url: "https://www.youtube.com/embed/RnBQela7oyE?"
        },
        "up_ballad_impression": {
            title: "soFt-dRink",
            description: `
                日常に寄り添い、優しく背中を押してくれる感動的なバラード。
                <br><br>
                じんわりと心に染み渡るようなメロディと歌詞が、あなたを温かく包み込みます。
            `,
            embed_url: "https://www.youtube.com/embed/vt9YVvYFitg?"
        },

        "up_edm_positive": {
            title: "WanteD! WanteD!",
            description: `
                アップテンポなEDMサウンドが特徴の代表曲！
                <br><br>
                ノリノリで元気になりたい時や、気分を一新したい時に最適な一曲です。
            `,
            embed_url: "https://www.youtube.com/embed/PbISczErpKY?"
        },
        "up_edm_deep": {
            title: "スマイロブドリーマ",
            description: `
                エレクトロニックなサウンドの中に、深いメッセージが込められた楽曲。
                <br><br>
                踊りながらも心に響く歌詞で、自分自身と向き合いたい時に。
            `,
            embed_url: "https://www.youtube.com/embed/BN6oz1WgyKk?"
        },
        "up_edm_love": {
            title: "Just a Friend",
            description: `
                軽快なEDMのリズムに乗せて、切ない友情と恋の狭間を描いた一曲。
                <br><br>
                友達以上恋人未満の関係に悩む時に、共感できる歌詞が心に響きます。
            `,
            embed_url: "https://www.youtube.com/embed/MC7eEs_jXPM?"
        },
        "up_edm_impression": {
            title: "サママ・フェスティバル！", 
            description: `
                夏のお祭りをテーマにした、明るく楽しい楽曲。
                <br><br>
                みんなで盛り上がりたい時や、夏の思い出に浸りたい時にぴったり。聴くだけでワクワクします。
            `,
            embed_url: "https://www.youtube.com/embed/25kQyBF6mz4?"
        },

        // しっとり
        "calm_rock_positive": {
            title: "橙",
            description: `
                夕焼けのような温かさと、穏やかな前向きさを持つロックナンバー。
                <br><br>
                一日の終わりにゆっくり聴きたい時や、心にじんわりと温かさを感じたい時に。
            `,
            embed_url: "https://www.youtube.com/embed/tGT7JM8hk0Q?"
        },
        "calm_rock_deep": {
            title: "嘘じゃないよ",
            description: `
                真実を問うような深い歌詞と、静かに響くロックサウンドが特徴。
                <br><br>
                自分と向き合いたい時や、心の奥底にある感情を探りたい時に寄り添ってくれるでしょう。
            `,
            embed_url: "https://www.youtube.com/embed/ZjjY2n_vwc0?"
        },
        "calm_rock_love": {
            title: "Hug",
            description: `
                優しく包み込むような愛を歌ったロックバラード。
                <br><br>
                大切な人との絆を感じたい時や、そっと寄り添ってほしい時に心に響きます。
            `,
            embed_url: "https://www.youtube.com/embed/o-JkzX3gJNM?"
        },
        "calm_rock_impression": {
            title: "春愁",
            description: `
                春の切なさと希望が交錯する、感動的なロックナンバー。
                <br><br>
                新しい季節への期待と、過ぎ去るものへの郷愁を感じながら浸りたい時に。
            `,
            embed_url: "https://www.youtube.com/embed/k1Ci-5lr-DA?"
        },

        "calm_pop_positive": {
            title: "lovin'",
            description: `
                軽快で心地よいポップサウンドが、心を穏やかに前向きにしてくれます。
                <br><br>
                リラックスしたい時や、ポジティブな気持ちになりたい時にぴったりの一曲。
            `,
            embed_url: "https://www.youtube.com/embed/Ff7kdaIQvQM?"
        },
        "calm_pop_deep": {
            title: "ケセラセラ",
            description: `
                人生の哲学をポップなメロディに乗せた、奥深い一曲。
                <br><br>
                ふと立ち止まって考えたい時にぴったり。肩の力を抜いて、流れに身を任せる勇気をくれます。
            `,
            embed_url: "https://www.youtube.com/embed/Jy-QS27q7lA?"
        },
        "calm_pop_love": {
            title: "フロリジナル",
            description: `
                花のように美しく咲き誇る愛を歌ったポップソング。
                <br><br>
                穏やかな気持ちで恋の喜びを感じたい時や、大切な人への想いを育みたい時に。
            `,
            embed_url: "https://www.youtube.com/embed/By2_SOQH9PA?"
        },
        "calm_pop_impression": {
            title: "familie",
            description: `
                家族や大切な人との絆を歌った、心温まる感動的なポップナンバー。
                <br><br>
                日々の感謝や、変わらない愛の尊さを感じたい時に、じんわりと心に染み渡ります。
            `,
            embed_url: "https://www.youtube.com/embed/FYhxYcXfhYA?"
        },

        "calm_ballad_positive": {
            title: "Folktale", 
            description: `
                おとぎ話のような温かい雰囲気と、前向きなメッセージが心を癒やすバラード。
                <br><br>
                疲れた心を癒やし、そっと背中を押してほしい時に寄り添ってくれます。
            `,
            embed_url: "https://www.youtube.com/embed/4buqIdr6FDM?"
        },
        "calm_ballad_deep": {
            title: "Dear",
            description: `
                静かに心に語りかけるような、深いメッセージを持つバラード。
                <br><br>
                自分自身や大切な人への想いを深く見つめ直したい時に、感情の揺らぎを優しく受け止めてくれます。
            `,
            embed_url: "https://www.youtube.com/embed/cNP21cprtbk?"
        },
        "calm_ballad_love": {
            title: "点描の唄 (feat. 井上苑子)",
            description: `
                大切な人への優しい気持ちが込められた、心温まるデュエット曲。
                <br><br>
                切なくも美しいメロディが特徴で、恋の始まりや終わりの情景が目に浮かぶようです。
            `,
            embed_url: "https://www.youtube.com/embed/sL-yJIyuEaM?"
        },
        "calm_ballad_impression": {
            title: "ナハトムジーク",
            description: `
                夜の静けさの中で、心に響く感動的なバラード。
                <br><br>
                深く考えたい夜に寄り添ってくれる一曲で、心の奥底に眠る感情を呼び覚まします。
            `,
            embed_url: "https://www.youtube.com/embed/Dsylo684yWA?"
        },

        "calm_edm_positive": {
            title: "CHEERS",
            description: `
                心地よいEDMサウンドと、乾杯したくなるようなポジティブなメッセージ。
                <br><br>
                穏やかな気持ちで新しい日を迎えたい時や、小さな喜びに感謝したい時に。
            `,
            embed_url: "https://www.youtube.com/embed/61FXSabbeC4?"
        },
        "calm_edm_deep": {
            title: "WHOO WHOO WHOO",
            description: `
                エレクトロニックなグルーヴの中に、深い問いかけが込められた楽曲。
                <br><br>
                思考を巡らせながらも、心地よいリズムに身を任せたい時に。
            `,
            embed_url: "https://www.youtube.com/embed/t_Bxu18ZJRE?"

        }, 
        "calm_edm_love": {
            title: "うブ",
            description: `
                EDMのリズムに乗せて、初々しい恋心を歌い上げた一曲。
                <br><br>
                甘酸っぱい気持ちに浸りたい時や、キュートな恋模様を感じたい時に。
            `,
            embed_url: "https://www.youtube.com/embed/fV_OE75FtFU?"
        },
        "calm_edm_impression": {
            title: "REVERSE",
            description: `
                幻想的なEDMサウンドが織りなす、感動的な世界観。
                <br><br>
                過去を振り返りながらも、新たな一歩を踏み出す勇気をくれるような一曲です。
            `,
            embed_url: "https://www.youtube.com/embed/sFYQUtSUwoY?"
        },

        // いやな気分
        "hate_rock_positive": {
            title: "私は最強 (提供曲)",
            description: `
                困難に立ち向かう強さを歌った、力強いロックナンバー。
                <br><br>
                気分が落ち込んでいる時でも、この曲を聴けばきっと背中を押され、立ち上がる勇気が湧いてきます。
            `,
            embed_url: "https://www.youtube.com/embed/cUdyx_B1J9E?"
        },
        "hate_rock_deep": {
            title: "ア・プリオリ",
            description: `
                重厚なロックサウンドと共に、深い哲学的な問いを投げかける楽曲。
                <br><br>
                複雑な感情を抱えている時に、思考を整理し、自分なりの答えを見つける手助けをしてくれるでしょう。
            `,
            embed_url: "https://www.youtube.com/embed/epqZJHI5I40?"
        },
        "hate_rock_love": {
            title: "Loneliness",
            description: `
                孤独や切ない恋愛感情を、エモーショナルなロックサウンドで表現した一曲。
                <br><br>
                一人で静かに感情と向き合いたい時や、共感を求める時に。
            `,
            embed_url: "https://www.youtube.com/embed/nUyFIf_DjVQ?"
        },
        "hate_rock_impression": {
            title: "おもちゃの兵隊",
            description: `
                心に深く響く、感動的なロックナンバー。
                <br><br>
                逆境に立ち向かう勇気を与えてくれるでしょう。苦しい時でも、希望を見出せるような力強さがあります。
            `,
            embed_url: "https://www.youtube.com/embed/1AxNa1lU0cM?"
        },

        "hate_pop_positive": {
            title: "アンラブレス",
            description: `
                ネガティブな感情を乗り越え、前向きに進むためのポップソング。
                <br><br>
                聴くと心が軽くなり、自分を愛することの大切さに気づかせてくれるでしょう。
            `,
            embed_url: "https://www.youtube.com/embed/zw9sAEbBJ0w?"
        },
        "hate_pop_deep": {
            title: "ダンスホール",
            description: `
                社会へのメッセージを軽快なポップサウンドに乗せた一曲。
                <br><br>
                踊りながらも、現代社会について深く考えるきっかけをくれるでしょう。
            `,
            embed_url: "https://www.youtube.com/embed/x2rvSf0STBM?"
        },
        "hate_pop_love": {
            title: "No.7",
            description: `
                人間関係の複雑さや、友情・愛情の奥深さを歌ったポップナンバー。
                <br><br>
                大切な人との関係について考えたい時や、共感を求める時に。
            `,
            embed_url: "https://www.youtube.com/embed/UocdSTIntTY?"
        },
        "hate_pop_impression": {
            title: "Attitude",
            description: `
                強い意志と覚悟を感じさせる、感動的なポップナンバー。
                <br><br>
                自分自身の「アティチュード」を再確認し、前に進む力を与えてくれます。
            `,
            embed_url: "https://www.youtube.com/embed/ji99kh-GzTQ?"
        },

        "hate_ballad_positive": {
            title: "僕のこと",
            description: `
                壮大なバラードで、困難な時でも希望を見出せるような前向きなメッセージ。
                <br><br>
                深い感動と共に、立ち直る力を与えてくれるでしょう。
            `,
            embed_url: "https://www.youtube.com/embed/xefpHEg5UIA?"
        },
        "hate_ballad_deep": {
            title: "BFF",
            description: `
                深い友情や絆について歌われた、心に響くバラード。
                <br><br>
                大切な友人や家族との関係を見つめ直し、感謝の気持ちを感じたい時に。
            `,
            embed_url: "https://www.youtube.com/embed/RtOACCwHMyE?"
        },
        "hate_ballad_love": {
            title: "Viking",
            description: `
                まるで物語を読んでいるかのような、幻想的なラブバラード。
                <br><br>
                切ない恋心や、運命的な出会いを描いた世界観に浸りたい時に。
            `,
            embed_url: "https://www.youtube.com/embed/3qEvWJcfjt0?"
        },
        "hate_ballad_impression": {
            title: "Soranji",
            description: `
                心に温かく染み渡るような、感動的なバラード。
                <br><br>
                悲しみや葛藤を乗り越え、安らぎを見つけるための優しいメロディが特徴です。
            `,
            embed_url: "https://www.youtube.com/embed/44cICMd3jW4?"
        },

        "hate_edm_positive": {
            title: "SPLASH!!!",
            description: `
                気分転換にぴったりの、明るくパワフルなEDMサウンド。
                <br><br>
                嫌な気分を吹き飛ばし、新たな活力を得たい時に最適です。
            `,
            embed_url: "https://www.youtube.com/embed/vufBHjELfr4?"
        },
        "hate_edm_deep": {
            title: "藍",
            description: `
                エレクトロニックな音と深い歌詞が織りなす、思索的な楽曲。
                <br><br>
                静かに自分と向き合いたい時や、心の奥底にある感情を探りたい時に。
            `,
            embed_url: "https://www.youtube.com/embed/R5MYQv7Qqzo?"
        },
        "hate_edm_love": {
            title: "L.P",
            description: `
                独特のEDMサウンドで、複雑な恋愛感情を表現した一曲。
                <br><br>
                胸の内にあるモヤモヤとした恋心を、リズムに乗せて感じたい時に。
            `,
            embed_url: "https://www.youtube.com/embed/Jwjj_Em-mog?"
        },
        "hate_edm_impression": {
            title: "WanteD! WanteD!",
            description: `
                高揚感のあるEDMサウンドに乗せられた、強いメッセージ。
                <br><br>
                嫌な気持ちを乗り越え、新しい自分になりたいという強い「感動」を覚えるでしょう。
            `,
            embed_url: "https://www.youtube.com/embed/PbISczErpKY?" 
        },

        // 悲しい
        "sad_rock_positive": {
            title: "ライラック",
            description: `
                悲しみの中でも一筋の光を見出すような、力強くも優しいロックナンバー。
                <br><br>
                静かに心を癒やし、前向きな気持ちになりたい時にそっと寄り添ってくれます。
            `,
            embed_url: "https://www.youtube.com/embed/QjrkrVmC-8M?"
        },
        "sad_rock_deep": {
            title: "我逢人",
            description: `
                人との出会いや別れ、そして人生の意味を深く考えさせるロックナンバー。
                <br><br>
                悲しい時でも、人との繋がりや巡り合わせの尊さを再確認できます。
            `,
            embed_url: "https://www.youtube.com/embed/OqEVEShYOv8?"
        },
        "sad_rock_love": {
            title: "ナニヲナニヲ",
            description: `
                切ない恋心や、すれ違う感情をロックサウンドに乗せて歌い上げた一曲。
                <br><br>
                悲しい恋愛の情景が目に浮かび、共感を覚えるでしょう。
            `,
            embed_url: "https://www.youtube.com/embed/uzyAw7ajW_s?"
        },
        "sad_rock_impression": {
            title: "クスシキ",
            description: `
                神秘的で壮大な雰囲気を持つロックナンバー。
                <br><br>
                悲しみの中に潜む美しさや、言葉にならない感情を呼び覚まし、深い感動を与えます。
            `,
            embed_url: "https://www.youtube.com/embed/RCaTLn4qoz4?"
        },

        "sad_pop_positive": {
            title: "Magic",
            description: `
                悲しい気持ちを魔法のようにポジティブな力に変えてくれるポップソング。
                <br><br>
                明るいメロディと希望に満ちた歌詞が、心を温かく照らしてくれます。
            `,
            embed_url: "https://www.youtube.com/embed/CN-Ja6jCweA?"
        },
        "sad_pop_deep": {
            title: "ANTENNA",
            description: `
                悲しみの中に隠された、新たな発見や気づきを歌ったポップナンバー。
                <br><br>
                心を解放し、自分自身を見つめ直したい時に、深く心に響くでしょう。
            `,
            embed_url: "https://www.youtube.com/embed/XiSa_VIrGKE?"
        },
        "sad_pop_love": {
            title: "ブルーアンビエンス",
            description: `
                切ない青い空間に広がるような、感傷的なラブソング。
                <br><br>
                悲しい恋の思い出に浸りたい時や、心穏やかに過ごしたい時に寄り添ってくれます。
            `,
            embed_url: "https://www.youtube.com/embed/ZP3GFkEE93A?"
        },
        "sad_pop_impression": {
            title: "アンゼンパイ",
            description: `
                大切な人への深い愛情と、それを守りたいという強い気持ちが込められた感動的なポップ。
                <br><br>
                悲しみの中でも、誰かの存在が安心を与えてくれることを教えてくれます。
            `,
            embed_url: "https://www.youtube.com/embed/mNJKbWHs1DE?"
        },

        "sad_ballad_positive": {
            title: "どこかで日は昇る",
            description: `
                暗闇の中にも必ず光があることを教えてくれる、希望に満ちたバラード。
                <br><br>
                悲しい時でも、前向きな気持ちになりたい時に、そっと心を温めてくれます。
            `,
            embed_url: "https://www.youtube.com/embed/UHqkN5NIyro?"
        },
        "sad_ballad_deep": {
            title: "ダーリン",
            description: `
                愛する人への深い感情と、その存在の大きさを歌ったバラード。
                <br><br>
                失われた愛や、遠く離れた人への想いを深く感じたい時に。
            `,
            embed_url: "https://www.youtube.com/embed/L262NKlSl4s?"
        },
        "sad_ballad_love": {
            title: "クダリ",
            description: `
                切なくも美しいメロディで、過ぎ去る恋の情景を描いたバラード。
                <br><br>
                悲しい恋愛の思い出に浸りたい時や、失恋の痛みを癒やしたい時に。
            `,
            embed_url: "https://www.youtube.com/embed/j7MPiIabcbE?"
        },
        "sad_ballad_impression": {
            title: "天国",
            description: `
                穏やかで感動的なメロディが、まるで天国にいるかのような安らぎを与えるバラード。
                <br><br>
                悲しい気持ちを静かに昇華させ、心に平和をもたらしたい時に。
            `,
            embed_url: "https://www.youtube.com/embed/CO0Eoj9aPcs?"
        },

        "sad_edm_positive": {
            title: "JOURNEY",
            description: `
                未来への希望を感じさせる、壮大なEDMサウンド。
                <br><br>
                悲しみを乗り越え、新しい旅に出る勇気を与えてくれるでしょう。
            `,
            embed_url: "https://www.youtube.com/embed/yt_ac9gO4xc?"
        },
        "sad_edm_deep": {
            title: "Speaking",
            description: `
                エレクトロニックなリズムの中に、深いメッセージが込められた楽曲。
                <br><br>
                悲しい気持ちを抱えながらも、内面と向き合い、新たな視点を見つけたい時に。
            `,
            embed_url: "https://www.youtube.com/embed/4KUA-1DvQZk?"
        },
        "sad_edm_love": {
            title: "SwitCh",
            description: `
                恋の複雑さや、感情の切り替わりをEDMサウンドで表現した一曲。
                <br><br>
                悲しい恋愛の状況から、新しいステップへと気持ちを「スイッチ」したい時に。
            `,
            embed_url: "https://www.youtube.com/embed/_iyyHZ0qCNQ?"
        },
        "sad_edm_impression": {
            title: "ツキマシテハ",
            description: `
                独特の世界観を持つEDMサウンドが、心に深く響く感動的な一曲。
                <br><br>
                悲しみや切なさを抱えながらも、心の奥底で何かを感じたい時に。
            `,
            embed_url: "https://www.youtube.com/embed/P2GhoO-u0kI?"
        },
    };

    // 最初の質問を表示
    function showCurrentQuestion() {
        questions.forEach((q, index) => {
            q.style.display = (index === currentQuestionIndex) ? 'block' : 'none';
        });
    }

    // 回答ボタンのイベントリスナー
    quizSection.querySelectorAll('.answer-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const questionId = questions[currentQuestionIndex].id;
            const answerValue = event.target.dataset.value;
            answers[questionId] = answerValue; // 回答を保存

            currentQuestionIndex++; // 次の質問へ

            if (currentQuestionIndex < questions.length) {
                showCurrentQuestion(); // 次の質問があれば表示
            } else {
                displayResult(); // 全ての質問に答え終わったら結果表示
            }
        });
    });

    // 結果表示関数
    function displayResult() {
        quizSection.style.display = 'none'; // 質問セクションを非表示
        resultSection.style.display = 'block'; // 結果セクションを表示

        // 組み合わせキーを生成 (例: "up_rock_positive")
        const key = `${answers.question1}_${answers.question2}_${answers.question3}`;
        
        // 該当する推薦曲がなければデフォルトを表示
        const recommendation = recommendations[key] || recommendations["default"];

        songTitle.textContent = recommendation.title;
        songDescription.innerHTML = recommendation.description; // ここをinnerHTMLに変更

        // YouTube埋め込み iframe を生成
        songLinkContainer.innerHTML = `
            <iframe width="100%" height="315" 
                    src="${recommendation.embed_url}" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen>
            </iframe>
        `;
    }

    // 初期表示: 最初の質問を表示
    showCurrentQuestion();

    // もう一度診断するボタンのイベントリスナー
    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        answers = {}; // 回答をリセット
        quizSection.style.display = 'block';
        resultSection.style.display = 'none';
        songLinkContainer.innerHTML = ''; // 動画をクリア
        showCurrentQuestion(); // 最初の質問に戻る
    });
});