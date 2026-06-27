import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:api_rick_morty/main.dart';

void main() {
  testWidgets('App muestra título correcto en AppBar', (WidgetTester tester) async {
    await tester.pumpWidget(const MyApp());
    expect(find.text('Rick and Morty Personajes'), findsOneWidget);
  });
}